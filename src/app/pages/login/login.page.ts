import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private service: DataService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.minLength(6)],
      password: ['', Validators.minLength(6)]
    });
  }

  ngOnInit() {
    const user = UserUtil.get();
    if (user) {
      this.showRedirect();
      this.navCtrl.navigateRoot('/');
    }
  }

  async submit() {
    const loading = await this.loadingCtrl.create({
      message: 'autenticando...'
    });
    loading.present();
    this
      .service
      .auth(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => {
          loading.dismiss();
          console.log(err);
          this.showError('usuário ou senha inválidos.');
        })
  }

  async showSuccess(user: any) {
    UserUtil.set(user);
    this.navCtrl.navigateRoot('/');
  }

  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Fechar'
    })
    toast.present();
  }

  async showRedirect() {
    const toast = await this.toastCtrl.create({
      message: 'você está sendo redirecionado...',
      duration: 3000,
      showCloseButton: false
    })
    toast.present();
  }
}
