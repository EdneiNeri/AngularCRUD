import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, NgForm } from '@angular/forms';
import { Contato } from '../service/contato.model';
import { ContatoService } from '../service/contato.service';

@Component({
  selector: 'app-formulario-contato',
  templateUrl: './formulario-contato.component.html',
  styleUrls: ['./formulario-contato.component.css']
})
export class FormularioContatoComponent implements OnInit {

  contatoForm!: FormGroup;
  submittingForm: boolean = false;
  currentAction!: string;
  contato!: Contato;
  pageTitle!: string;
  maskPhone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskCPF = [ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  constructor(
    private _contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.contato = new Contato();
    this.setCurrentAction();
  }
  ngAfterContentChecked() {
    this.atualizarPageTitle();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[1].path == "novo") {
      this.currentAction = "new";
    }
    else {
      this.currentAction = "edit";
      this.carregarContato();
    }
  }

  submitForm(contatoForm:NgForm) {
    console.log(contatoForm)
    this.submittingForm = true;

    if (this.currentAction == "new") {
      this.criarContato(contatoForm);
    }
    else {
      this.atualizarContato(contatoForm);
    }
  }

  private carregarContato() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get("id") || "";

          return this._contatoService.buscarPorId(id);
        })
        ).subscribe(
          (c: Contato) => {
            this.contato = c;
          },
          (error: any) => alert('Ocorreu um erro no servidor, tente novamente.')
        )
    }
  }

  private criarContato(contatoForm: NgForm) {
    const contato: Contato = Object.assign(new Contato(), contatoForm.value);

    this._contatoService.gravar(contato)
      .subscribe(
        () => this.cadastroGravadoComSucesso(),
        (error: any) => this.erroAoGravarContato(error)
      )
  }

  private atualizarContato(contatoForm: NgForm) {
    const contato: Contato = Object.assign(new Contato(), contatoForm.value);

    this._contatoService.atualizar(contato)
      .subscribe(
        (contato: Contato) => this.cadastroGravadoComSucesso(),
        (error: any) => this.erroAoGravarContato(error)
      )
  }

  private cadastroGravadoComSucesso() {
    this.router.navigateByUrl("contatos")
  }

  private erroAoGravarContato(error: any) {
    alert(error.body.error);
  }

  private atualizarPageTitle() {
    if (this.currentAction == "new")
      this.pageTitle = "Cadastro de Novo Contato";
    else {
      const contatoNome = this.contato.nome || ""
      this.pageTitle = "Editando Contato: " + contatoNome;
    }
  }
}


