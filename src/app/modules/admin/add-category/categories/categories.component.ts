import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CategoryService } from '../../../../shared/services/category.service';
import {
  Category,
  MoveCategoryRequest,
} from '../../../../shared/model/category.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Toast, ToastrService } from 'ngx-toastr';

class TreeNode {
  id: string;
  name: string;
  childsCategories: TreeNode[];
  isExpanded: boolean;

  constructor(
    id: string,
    name: string,
    childsCategories: TreeNode[],
    isExpanded: boolean
  ) {
    this.id = id;
    this.name = name;
    this.childsCategories = childsCategories;
    this.isExpanded = isExpanded;
  }

  // You can also add methods to this class if needed
}
export interface DropInfo {
  targetId: string;
  action?: string;
}

interface FlattenedNode {
  id: string;
  parentId: string | null; // Null for root level categories
}

export var demoData: TreeNode[] = [
  {
    id: 'item 1',
    name: '',
    childsCategories: [],
    isExpanded: true,
  },
  {
    id: 'item 2',
    name: '',
    childsCategories: [
      {
        id: 'item 2.1',
        name: '',
        childsCategories: [],
        isExpanded: true,
      },
      {
        id: 'item 2.2',
        name: '',
        childsCategories: [],
        isExpanded: true,
      },
      {
        id: 'item 2.3',
        name: '',
        childsCategories: [],
        isExpanded: true,
      },
    ],
    isExpanded: true,
  },
  {
    id: 'item 3',
    name: '',
    childsCategories: [],
    isExpanded: true,
  },
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  nodes: TreeNode[] = demoData;

  categories: any = [];

  // ids for connected drop lists
  dropTargetIds = [];
  nodeLookup = {};
  dropActionTodo: DropInfo = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.categories = data['categoriesData'].value;
      console.log(this.categories);

      this.nodes = this.categories;
      this.expandAllNodes(this.nodes); // Ensure all nodes are expandeds
      console.log(this.nodes);
      this.prepareDragDrop(this.nodes);
    });
  }

  ngOnInit(): void {}

  // Recursively expand all nodes and their child nodes
  expandAllNodes(nodes: TreeNode[]): void {
    nodes.forEach((node) => {
      node.isExpanded = true; // Set current node to expanded
      if (node.childsCategories && node.childsCategories.length > 0) {
        this.expandAllNodes(node.childsCategories); // Recursively expand child nodes
      }
    });
  }

  prepareDragDrop(nodes: TreeNode[]) {
    nodes.forEach((node) => {
      this.dropTargetIds.push(node.id);
      node.isExpanded = true; // Ensure all nodes are expanded for dragging
      this.nodeLookup[node.id] = node;
      if (node.childsCategories) {
        this.prepareDragDrop(node.childsCategories); // Recursively prepare child nodes
      }
    });
  }

  dragMoved(event) {
    let e = this.document.elementFromPoint(
      event.pointerPosition.x,
      event.pointerPosition.y
    );

    if (!e) {
      this.clearDragInfo();
      return;
    }
    let container = e.classList.contains('node-item')
      ? e
      : e.closest('.node-item');
    if (!container) {
      this.clearDragInfo();
      return;
    }
    this.dropActionTodo = {
      targetId: container.getAttribute('data-id'),
    };
    const targetRect = container.getBoundingClientRect();
    const oneThird = targetRect.height / 3;

    if (event.pointerPosition.y - targetRect.top < oneThird) {
      // before
      this.dropActionTodo['action'] = 'before';
    } else if (event.pointerPosition.y - targetRect.top > 2 * oneThird) {
      // after
      this.dropActionTodo['action'] = 'after';
    } else {
      // inside
      this.dropActionTodo['action'] = 'inside';
    }
    this.showDragInfo();
  }

  /////////////////////////////////////////////////////

  drop(event) {
    if (!this.dropActionTodo) return;

    const draggedItemId = event.item.data; // The ID of the dragged item
    const parentItemId = event.previousContainer.id; // The parent container ID before moving
    const targetParentId = this.getParentNodeId(
      this.dropActionTodo.targetId,
      this.nodes,
      'main'
    ); // Parent container ID of the target

    console.log(this.nodes);
    const image = JSON.parse(JSON.stringify(this.nodes));

    // Find the dragged item
    const choosenItem = this.nodeLookup[draggedItemId];
    // Find the target item where it's being dropped
    const targetItem = this.nodeLookup[this.dropActionTodo.targetId];

    console.log('dragged  target', choosenItem.id + ' ' + targetItem.id);

    console.log(
      `Moving Category [${draggedItemId}] from Parent [${parentItemId}]`,
      `\nAction: [${this.dropActionTodo.action}]`,
      `\nTarget Category: [${this.dropActionTodo.targetId}] in Parent [${targetParentId}]`
    );

    const draggedItem = this.nodeLookup[draggedItemId];

    const oldItemContainer =
      parentItemId !== 'main'
        ? this.nodeLookup[parentItemId].childsCategories
        : this.nodes;
    const newContainer =
      targetParentId !== 'main'
        ? this.nodeLookup[targetParentId].childsCategories
        : this.nodes;

    let i = oldItemContainer.findIndex((c) => c.id === draggedItemId);
    oldItemContainer.splice(i, 1); // Remove the dragged item from the old container

    switch (this.dropActionTodo.action) {
      case 'before':
      case 'after':
        const targetIndex = newContainer.findIndex(
          (c) => c.id === this.dropActionTodo.targetId
        );
        if (this.dropActionTodo.action == 'before') {
          newContainer.splice(targetIndex, 0, draggedItem); // Insert before the target
        } else {
          newContainer.splice(targetIndex + 1, 0, draggedItem); // Insert after the target
        }
        break;

      case 'inside':
        if (!this.nodeLookup[this.dropActionTodo.targetId].childsCategories) {
          this.nodeLookup[this.dropActionTodo.targetId].childsCategories = [];
        }
        this.nodeLookup[this.dropActionTodo.targetId].childsCategories.push(
          draggedItem
        ); // Move inside the target
        this.nodeLookup[this.dropActionTodo.targetId].isExpanded = true;
        break;
    }

    // Check if the category is moved into itself
    if (draggedItemId === this.dropActionTodo.targetId) {
      console.warn(`Category [${draggedItemId}] cannot be moved into itself.`);
      return;
    }

    console.log(image === JSON.parse(JSON.stringify(this.nodes)));

    // Deep compare trees
    const treesAreIdentical = this.deepCompareTree(image, this.nodes);
    console.log('Trees are identical:', treesAreIdentical);

    // Log the move
    if (!treesAreIdentical) {
      console.log('Move detected:');
      console.log(`ID [${draggedItemId}] moved to Parent [${targetParentId}]`);

      let request: MoveCategoryRequest = {
        sourceCategoryId: choosenItem.id,
        newParentCategoryId: targetItem.id,
      };

      this.categoryService.MoveCategory(request).subscribe((data) => {
        console.log(data);
      });
    } else {
      console.log('No structural changes. No API request needed.');
      this.toastrService.info('no structure changed!');
    }

    this.clearDragInfo(true);
    console.log(this.nodes); // Log the updated nodes structure
  }

  deepCompareTree(tree1: TreeNode[], tree2: TreeNode[]): boolean {
    if (tree1.length !== tree2.length) return false;

    for (let i = 0; i < tree1.length; i++) {
      const node1 = tree1[i];
      const node2 = tree2[i];

      // Compare id and other non-nested properties
      if (
        node1.id !== node2.id ||
        node1.name !== node2.name ||
        node1.isExpanded !== node2.isExpanded
      ) {
        return false;
      }

      // Compare children recursively
      if (
        !this.deepCompareTree(node1.childsCategories, node2.childsCategories)
      ) {
        return false;
      }
    }

    return true;
  }

  sortNodesByName(nodes: TreeNode[]): TreeNode[] {
    nodes.sort((a, b) => a.name.localeCompare(b.name));

    nodes.forEach((node) => {
      if (node.childsCategories && node.childsCategories.length > 0) {
        node.childsCategories = this.sortNodesByName(node.childsCategories);
      }
    });

    return nodes;
  }

  //////////////////////////////////////////////////////////////

  getParentNodeId(
    id: string,
    nodesToSearch: TreeNode[],
    parentId: string
  ): string | null {
    for (let node of nodesToSearch) {
      // If the current node's id matches the target id, return the parentId
      if (node.id === id) return parentId;

      // If the node has child nodes, search recursively in the children
      if (node.childsCategories) {
        let ret = this.getParentNodeId(id, node.childsCategories, node.id);

        // If a valid parentId is found in the children, return it
        if (ret) return ret;
      }
    }

    // Return null if the id was not found in this branch
    return null;
  }

  showDragInfo() {
    this.clearDragInfo();
    if (this.dropActionTodo) {
      this.document
        .getElementById('node-' + this.dropActionTodo.targetId)
        .classList.add('drop-' + this.dropActionTodo.action);
    }
  }
  clearDragInfo(dropped = false) {
    if (dropped) {
      this.dropActionTodo = null;
    }
    this.document
      .querySelectorAll('.drop-before')
      .forEach((element) => element.classList.remove('drop-before'));
    this.document
      .querySelectorAll('.drop-after')
      .forEach((element) => element.classList.remove('drop-after'));
    this.document
      .querySelectorAll('.drop-inside')
      .forEach((element) => element.classList.remove('drop-inside'));
  }

  // Adjusted addItem for consistency
  addItem(parentId: string | null = null) {
    const newNode: TreeNode = {
      id: (Math.random() * 1000).toFixed(0), // Random ID
      childsCategories: [], // Ensure this is always initialized
      isExpanded: false, // Default to collapsed
      name: parentId ? 'New Child' : 'New Root', // Name it based on parentId
    };

    if (parentId) {
      // Add as child of the parent node
      const parentNode = this.nodeLookup[parentId];
      parentNode.childsCategories.push(newNode);
      parentNode.isExpanded = true; // Ensure parent is expanded
    } else {
      // Add as root node
      this.nodes.push(newNode);
    }

    // Update the node lookup and drag/drop targets
    this.nodeLookup[newNode.id] = newNode;
    this.dropTargetIds.push(newNode.id);
  }

  removeItem(nodeId: string) {
    const parentNodeId = this.getParentNodeId(nodeId, this.nodes, 'main');
    const parentArray =
      parentNodeId === 'main'
        ? this.nodes
        : this.nodeLookup[parentNodeId].childsCategories;

    const index = parentArray.findIndex((node) => node.id === nodeId);
    if (index > -1) {
      parentArray.splice(index, 1); // Remove node from array
    }

    // Remove from node lookup and drag/drop targets
    delete this.nodeLookup[nodeId];
    this.dropTargetIds = this.dropTargetIds.filter((id) => id !== nodeId);
  }

  addChildCategory(parentId: string) {
    const newChild: TreeNode = {
      id: (Math.random() * 1000).toFixed(0), // Generate a random ID for the new child category
      childsCategories: [],
      isExpanded: false,
      name: 'New Child Category',
    };

    const parentNode = this.nodeLookup[parentId];
    parentNode.childsCategories.push(newChild);
    parentNode.isExpanded = true; // Ensure parent is expanded

    // Update node lookup and drag/drop targets
    this.nodeLookup[newChild.id] = newChild;
    this.dropTargetIds.push(newChild.id);
  }
  // Get Categories

  GetAllCategories() {
    this.categoryService.GetAllCategories().subscribe((data) => {
      this.categories = data.value;
      this.nodes = this.categories;

      // Expand all nodes and prepare drag/drop functionality
      this.expandAllNodes(this.nodes);
      this.prepareDragDrop(this.nodes);
    });
  }
}
