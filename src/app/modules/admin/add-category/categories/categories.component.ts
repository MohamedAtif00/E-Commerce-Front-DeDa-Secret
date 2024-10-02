import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';

interface CategoryNode {
  name: string;
  children?: CategoryNode[];
}

const TREE_DATA: CategoryNode[] = [
  {
    name: 'Home',
    children: [],
  },
  {
    name: 'Categories',
    children: [{ name: 'Skin Care' }, { name: 'Hair Care' }],
  },
  {
    name: 'All Products',
    children: [],
  },
  {
    name: 'Sign In',
    children: [],
  },
  {
    name: 'Sign Up',
    children: [],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  editing?: boolean;
  isAddingChild?: boolean; // To toggle add child input
  newCategoryName?: string; // For storing the new category name
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  // private _transformer = (node: CategoryNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level,
  //   };
  // };

  // treeControl = new FlatTreeControl<ExampleFlatNode>(
  //   (node) => node.level,
  //   (node) => node.expandable
  // );

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   (node) => node.level,
  //   (node) => node.expandable,
  //   (node) => node.children
  // );

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // constructor() {
  //   this.dataSource.data = TREE_DATA;
  // }

  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  // // Method to add a new child category
  // addCategory(parentNode: ExampleFlatNode) {
  //   const newCategoryName = prompt('Enter new category name:');
  //   if (newCategoryName) {
  //     // Find the node in the original data structure and add a child
  //     this.addChildToNode(TREE_DATA, parentNode.name, newCategoryName);
  //     // Refresh the data source to update the tree
  //     this.dataSource.data = TREE_DATA;
  //   }
  // }

  // // Recursive method to add a child category to the selected parent node
  // addChildToNode(nodes: CategoryNode[], parentName: string, childName: string) {
  //   for (const node of nodes) {
  //     if (node.name === parentName) {
  //       if (!node.children) {
  //         node.children = [];
  //       }
  //       node.children.push({ name: childName });
  //       return;
  //     }
  //     if (node.children) {
  //       this.addChildToNode(node.children, parentName, childName);
  //     }
  //   }
  // }

  treeData: TreeNode[] = [
    { id: '1', name: 'Home' },
    {
      id: '2',
      name: 'Categories',
      children: [
        { id: '3', name: 'Skin Care' },
        { id: '4', name: 'Hair Care' },
      ],
    },
    { id: '5', name: 'All Products' },
    { id: '6', name: 'Sign In' },
    { id: '7', name: 'Sign Up' },
  ];

  draggedNode: TreeNode | null = null;

  // Handle drag-and-drop logic here (same as before)
  onDragStart(event: DragEvent, node: TreeNode) {
    this.draggedNode = node;
  }

  onDrop(event: DragEvent, node: TreeNode) {
    event.preventDefault();
    if (this.draggedNode && this.draggedNode !== node) {
      if (!node.children) {
        node.children = [];
      }
      node.children.push(this.draggedNode);
      this.removeNode(this.draggedNode, this.treeData);
      this.draggedNode = null;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removeNode(node: TreeNode, nodes: TreeNode[]) {
    const index = nodes.indexOf(node);
    if (index > -1) {
      nodes.splice(index, 1);
    } else {
      for (let child of nodes) {
        if (child.children) {
          this.removeNode(node, child.children);
        }
      }
    }
  }

  // Add new category logic with input
  addNewCategory(node: TreeNode) {
    if (node.newCategoryName?.trim()) {
      const newNode: TreeNode = {
        id: Date.now().toString(),
        name: node.newCategoryName,
      };

      if (!node.children) {
        node.children = [];
      }

      node.children.push(newNode);
      node.newCategoryName = ''; // Clear input after adding
      node.isAddingChild = false; // Hide input after adding
    }
  }

  toggleAddCategory(node: TreeNode) {
    node.isAddingChild = !node.isAddingChild;
  }

  editNode(node: TreeNode) {
    node.editing = true;
  }

  saveNode(node: TreeNode) {
    node.editing = false;
  }
}
