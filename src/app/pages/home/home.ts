import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Searchbox } from "../../components/searchbox/searchbox";
import { Platformsupport } from "../../components/platformsupport/platformsupport";
import { Features } from "../../components/features/features";
import { Howitwork } from "../../components/howitwork/howitwork";
import { Faq } from "../../components/faq/faq";

@Component({
  selector: 'app-home',
  imports: [Navbar, Searchbox, Platformsupport, Features, Howitwork, Faq ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
