import { Routes } from "@angular/router";
import { HomeComponent } from "./core/components/home/home.component";
import { ExampleComponent } from "./models/components/example/example.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "example", component: ExampleComponent },
];
