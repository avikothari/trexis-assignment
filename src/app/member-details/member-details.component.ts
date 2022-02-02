import { Component, OnInit, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {

  teams: any = [];
  member_form!: FormGroup

  constructor(private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm()

    if (this.activatedRoute.snapshot.queryParamMap.get('id')) {
      this.getMemberDetails(this.activatedRoute.snapshot.queryParamMap.get('id'))
    }

    this.getTeams()
  }

  ngOnChanges() { }

  initForm() {
    this.member_form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      team: ['', [Validators.required]],
      status: ['Active']
    })
  }

  getTeams() {
    this.appService.getTeams().subscribe((teams: any) => {
      this.teams = teams
    })
  }

  getMemberDetails(member_id: any) {
    this.appService.getMemberDetails(member_id).subscribe((data: any) => {
      this.populateForm(data)
    })
  }

  populateForm(member_details: any) {
    this.member_form.patchValue(member_details)
  }

  toggleStatus(event: any) {
    this.member_form.get('status')?.setValue(event.target.value)
  }

  // TODO: Add member to members
  onSubmit() {
    if (this.member_form.invalid) {
      return
    }

    if (this.activatedRoute.snapshot.queryParamMap.get('id')) {
      this.appService.editMember(this.member_form.value, this.activatedRoute.snapshot.queryParamMap.get('id'))
        .subscribe((result: any) => {
          this.router.navigate(['members'])
        })
    } else
      this.appService.addMember(this.member_form.value).subscribe((result: any) => {
        this.router.navigate(['members'])
      })
  }

}
