import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaiorIdadeDirective,
    multi: true
  }]
})
export class MaiorIdadeDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = control.value;
    const anoNascimento : number = new Date(dataNascimento).getFullYear();
    const anoAtual : number = new Date().getFullYear();
    const anoNascMais18 : number = anoNascimento + 18.0;
    const ehMaior :boolean = anoNascMais18 <= anoAtual;

    return ehMaior ? null: {'maiorIdadeValidator': true};
  }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }

}
