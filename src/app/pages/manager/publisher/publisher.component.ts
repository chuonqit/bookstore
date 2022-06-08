import { IPublisher } from './../../../shared/models/Publisher.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublisherService } from './../../../shared/services/publisher.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss'],
})
export class PublisherComponent implements OnInit {
  publishers: IPublisher[];
  isVisible = false;
  isOkLoading = false;
  publisherForm: FormGroup;
  currentData: IPublisher | null;

  constructor(
    private nzMessageService: NzMessageService,
    private publisherService: PublisherService
  ) {
    this.publishers = [];
    this.currentData = null;
    this.publisherForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      status: new FormControl(false, []),
    });
  }

  showModal(data: IPublisher | null): void {
    this.isVisible = true;
    if (data) {
      this.currentData = data;
      this.publisherForm.patchValue(data);
    }
  }

  handleOk(): void {
    this.onSubmit();
  }

  onSubmit() {
    this.isOkLoading = true;
    if (this.currentData) {
      this.publisherService
        .update({ _id: this.currentData._id, ...this.publisherForm.value })
        .subscribe(
          (response) => {
            this.isVisible = false;
            this.isOkLoading = false;
            const updateData = this.publishers.map((publisher) =>
              publisher._id === this.currentData?._id ? response : publisher
            );
            this.publishers = [...updateData];
            this.nzMessageService.success('Cập nhật thành công');
          },
          (error) => {
            this.nzMessageService.error(error.error);
          }
        );
    } else {
      this.publisherService.create(this.publisherForm.value).subscribe(
        (response) => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.publishers = [response, ...this.publishers];
          this.nzMessageService.success('Thêm thành công');
        },
        (error) => {
          this.nzMessageService.error(error.error);
        }
      );
    }
    this.publisherForm.reset();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.publisherForm.reset();
  }

  confirm(id: string): void {
    this.publisherService.delete(id).subscribe(
      () => {
        const filtered = this.publishers.filter(
          (publisher) => publisher._id !== id
        );
        this.publishers = [...filtered];
        this.nzMessageService.success('Xóa thành công');
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  changeStatus(id: string, status: boolean): void {
    this.publisherService.update_status(id, status).subscribe(
      (response) => {
        const updateData = this.publishers.map((publisher) =>
          publisher._id === id ? response : publisher
        );
        this.publishers = [...updateData];
        this.nzMessageService.success('Thay đổi trạng thái thành công');
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.publisherService.list().subscribe(
      (publishers) => {
        this.publishers = publishers;
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }
}
