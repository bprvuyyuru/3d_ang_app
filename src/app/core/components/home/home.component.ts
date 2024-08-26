import { Component } from "@angular/core";
import { ExampleComponent } from "../../../models/components/example/example.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ExampleComponent, FormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  cameraZ: number = 100;
  rotationSpeedX: number = 0.05;
  rotationSpeedY: number = 0.01;
  texture: string = "/assets/texture.jpg";

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.texture = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
}
