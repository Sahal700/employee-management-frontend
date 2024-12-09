import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiserviceService } from './services/apiservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  allEmployee:any = []
  data:any =[]
  edit:boolean = false
  empId:any = ''
  registerForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    status: new FormControl('')
  })
  
  constructor(private api:ApiserviceService){}
  ngOnInit(): void {
    
    
    this.api.getemployee().subscribe((res)=>{
      this.data=res
      this.allEmployee=this.data
      console.log(this.allEmployee);
      
    })
  }
  filter(status:string){
    if (status!='') {
      this.allEmployee=this.data.filter((item:any)=>
        item.status==status
      )
    }else{
      this.allEmployee=this.data
    }
    
  }
  handleAdd(){
    console.log(this.registerForm.value);
    this.api.addEmployee(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.ngOnInit()
        alert('added success fully')
      },
      error:(err)=>{
        console.log(err);
        alert("something went wrong")
        
      }
    })
  }
  handleEdit(name:string,age:string,email:string,status:string,id:any){
    this.edit=true
    this.registerForm.setValue({
      name,age,email,status
    })
    this.empId=id
  }
  handleClose(){
    this.edit=false
    this.registerForm.setValue({
      name:'',age:'',email:"",status:''
    })
  }
  handleSave(){
    this.api.editEmployee(this.empId,this.registerForm.value).subscribe({
      next:(res)=>{
      this.ngOnInit()
      alert("edited successfully")
      },
      error:()=>{
        alert("something went wrong")
      }
  })
  }
  handleDelete(id:any){
    this.api.deleteEmp(id).subscribe(()=>{
      this.ngOnInit()
    })
  }
  handleclr(){
    this.registerForm.setValue({
      name:'',age:'',email:"",status:''
    })
  }

}
