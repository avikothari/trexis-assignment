import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: any[] = [];

  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getMembers()
  }

  goToAddMemberForm() {
    this.router.navigate(['member-details'])
  }

  getMembers() {
    this.appService.getMembers().subscribe((members: any) => (this.members = members));
  }

  editMember(member_id: any) {
    this.router.navigate(['member-details'], {
      queryParams: {
        id: member_id
      }
    })

  }

  deleteMember(member_id: any) {
    this.appService.deleteMember(member_id).subscribe((data: any) => {
      const index = this.members.findIndex((member:any)=> member_id === member.id)
      this.members.splice(index,1)
    })
  }


}
