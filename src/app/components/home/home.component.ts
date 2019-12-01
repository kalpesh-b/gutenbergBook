import { Component, OnInit } from "@angular/core";
import { homeConstants } from "./home.constants";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public constants = homeConstants;

  constructor() {}

  ngOnInit() {}

  getImageUrl = genre => `/assets/images/${genre}.svg`;
}
