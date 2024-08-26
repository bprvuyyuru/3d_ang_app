import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./components/home/home.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeComponent, FormsModule],
})
export class CoreModule {}
