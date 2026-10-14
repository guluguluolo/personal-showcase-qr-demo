"use strict";
(() => {
  const data = window.SHOWCASE_CONFIG;
  const setText = (id, value) => { document.getElementById(id).textContent = String(value ?? ""); };
  document.title = data.title;
  for (const key of ["title", "subtitle", "name", "tagline"]) setText(key === "title" ? "page-title" : key, data[key]);
  setText("photo-caption", data.photoCaption);
  const photo = document.getElementById("portrait");
  photo.alt = data.photoAlt;
  photo.addEventListener("error", () => {
    if (!photo.src.endsWith("/assets/placeholder.svg")) photo.src = "assets/placeholder.svg";
    photo.alt = "照片未加载，显示通用头像";
    setText("photo-caption", "照片未加载，请检查配置中的图片路径");
  });
  photo.src = data.photo;
  for (const field of data.fields) {
    const row = document.createElement("div");
    const label = document.createElement("dt");
    const value = document.createElement("dd");
    label.textContent = field.label;
    value.textContent = field.value;
    row.append(label, value);
    document.getElementById("fields").append(row);
  }
  for (const item of data.gallery ?? []) {
    const figure = document.createElement("figure");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    link.href = item.src;
    link.setAttribute("aria-label", "查看原图：" + item.title);
    img.src = item.src;
    img.alt = item.title;
    img.loading = "lazy";
    title.textContent = item.title;
    description.textContent = item.description;
    link.append(img);
    caption.append(title, description);
    figure.append(link, caption);
    document.getElementById("gallery-items").append(figure);
    document.getElementById("gallery-section").hidden = false;
  }
  if (data.publicUrl && data.qrImage) {
    try {
      const url = new URL(data.publicUrl);
      if (url.protocol !== "https:") throw new Error("需要 HTTPS 地址");
      const qr = document.getElementById("qr-image");
      qr.addEventListener("load", () => {
        document.getElementById("qr-placeholder").hidden = true;
        qr.hidden = false;
      });
      qr.src = data.qrImage;
      const link = document.getElementById("page-link");
      link.href = url.href;
      link.hidden = false;
    } catch { setText("qr-placeholder", "请配置有效的正式 HTTPS 网址"); }
  }
})();
