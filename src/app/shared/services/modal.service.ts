import { Injectable } from "@angular/core";
import { ModalOptions, InstanceOptions, ModalInterface, Modal, modalPlacement } from "flowbite";
import { Subject } from "rxjs";
import { GetAllProducts } from "../model/product.model";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private $modalElement: HTMLElement | null = null;
    private modalOptions: ModalOptions;
    private instanceOptions: InstanceOptions = {}; // Initialize if needed
    private modal: ModalInterface | null = null;
    public open: Subject<GetAllProducts> = new Subject<GetAllProducts>();
    public hide: Subject<void> = new Subject<void>();

    constructor() {
        // Subscribe to open and hide subjects
        this.open.subscribe(data => { 
            if (data) {
                this.ShowModal(data.id);
            }
        });

        this.hide.subscribe(() => {
            this.CloseModal();           
        });
    }

    InitModal(querySelector: string, position: modalPlacement = 'bottom-right') {
        this.$modalElement = document.querySelector(querySelector);
        if (this.$modalElement) {
            this.modalOptions = {
                placement: position,
                backdrop: 'dynamic',
                backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
                closable: true,
                onHide: () => {
                    console.log('modal is hidden');
                },
                onShow: () => {
                    console.log('modal is shown');
                },
                onToggle: () => {
                    console.log('modal has been toggled');
                },
            };

            this.modal = new Modal(this.$modalElement, this.modalOptions, this.instanceOptions);
        } else {
            console.error('Modal element not found');
        }
    }

    ShowModal(id: string) {
        if (this.modal) {
            this.modal.show(); // Use show() if you want to explicitly show the modal
        } else {
            console.error('Modal is not initialized');
        }
    }

    CloseModal() {
        if (this.modal) {
            this.modal.hide();
        } else {
            console.error('Modal is not initialized');
        }
    }
}
