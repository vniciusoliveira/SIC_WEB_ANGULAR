import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieSession } from '../../services/cookie/cookie-service-session.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  constructor(private router:Router,
              private route:ActivatedRoute,
              private cookieSession:CookieSession){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParam => {
      try{

        if(queryParam[btoa('matricula')]){
          this.cookieSession.setCookie(btoa("matricula"), atob(queryParam[btoa('matricula')]).toString(), 1);
        } 

        if(queryParam['rota']){
          this.mudarPag(queryParam['rota']);
        }
        
        if(!this.cookieSession.IsLogged()) {
          window.location.href = 'http://admweb.tmkt.servicos.mkt/SIC_WEB/LOGIN.ASPX';
        }

      } catch (ex) {
        window.location.href =
        'http://admweb.tmkt.servicos.mkt/SIC_WEB/LOGIN.ASPX';
      }
    })
  }

  mudarPag(pagina:String):void{
    if(pagina == ""){
      this.router.navigate(['']);
    } else {
      this.router.navigate(["/"+pagina]);
    }
  }
}
