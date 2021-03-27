import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: "dus5lm40j",
  api_key: "614831885283667",
  api_secret: "PyDaclOAJcSWtDT-FJpVMZKPsMU",
});

describe("pruebas en fileUpload", () => {
  test("debe retornar el Url", async () => {
    const res = await fetch(
      "https://img-a.udemycdn.com/redactor/raw/q_and_a/2021-03-24_17-04-15-6ac379338ab52f8362731ef8aac0b7f0.JPG?m6f041GZeOCcgTDpTSlvLVzM6IDdg9jUzWSUGDBqe46YdygaUat6F2uu48k-egO7PfGt5izbbyhNVJPx7cmRW0htnYabfiPw75j-YzXX3pEs5YbHdyKdS90L8BE1MOPNjsydqlThoRqavgjY4JhurRqQpYk2QpkhUY0EYWB0ue3DVcxvzu3FVnjZEdE"
    );

    const blob = await res.blob();

    const file = new File([blob], "foto.png");

    const url = await fileUpload(file);

    //eliminar imagen
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    await cloudinary.v2.api.delete_resources(imageId);
    expect(typeof url).toBe("string");
  });
});
