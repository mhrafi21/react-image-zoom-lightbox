# react-image-zoom-lightbox

[![npm version](https://img.shields.io/npm/v/react-image-zoom-lightbox.svg?style=flat-square\&color=blue)](https://www.npmjs.com/package/react-image-zoom-lightbox)
[![npm downloads](https://img.shields.io/npm/dm/react-image-zoom-lightbox.svg?style=flat-square\&color=green)](https://www.npmjs.com/package/react-image-zoom-lightbox)
[![license](https://img.shields.io/npm/l/react-image-zoom-lightbox.svg?style=flat-square)](https://github.com/mhrafi21/react-image-zoom-lightbox/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mhrafi21/react-image-zoom-lightbox?style=flat-square)](https://github.com/mhrafi21/react-image-zoom-lightbox)

A lightweight, zero-dependency, zero-configuration image zoom and lightbox component for React and TypeScript applications.

`react-image-zoom-lightbox` provides a smooth image viewing experience with image zooming, drag/pan gestures, touch support, mouse-wheel scaling, keyboard controls, and customizable UI icons.

## ✨ Features

* 🚀 **Zero Configuration** — Works out of the box with minimal setup.
* 📦 **Zero Runtime Dependencies** — No external icon, animation, or utility libraries required.
* 🔍 **Image Zoom** — Smoothly zoom images from 1x up to your configured maximum scale.
* 🖱️ **Drag & Pan** — Move around an image while zoomed in.
* 📱 **Touch Friendly** — Designed for mobile devices and tablets.
* 🖱️ **Mouse Wheel Zoom** — Zoom images using the mouse wheel.
* ⌨️ **Keyboard Support** — Close the lightbox using the `Escape` key.
* 🎨 **Custom Icons** — Replace built-in SVG icons with your own React components.
* 🎯 **TypeScript Support** — Fully typed API for a better developer experience.
* 🎨 **Styling Friendly** — Works with regular CSS, CSS Modules, Styled Components, or any React styling approach.
* ⚡ **Lightweight** — Focused on essential image zoom functionality without unnecessary dependencies.

---

## 📦 Installation

Install the package using your preferred package manager.

### npm

```bash
npm install react-image-zoom-lightbox
```

### yarn

```bash
yarn add react-image-zoom-lightbox
```

### pnpm

```bash
pnpm add react-image-zoom-lightbox
```

### Requirements

* React 18+
* React DOM 18+

---

## 🚀 Quick Start

Import the `ImageZoomModal` component and the `useImageZoom` hook.

```tsx
import React from "react";
import {
  ImageZoomModal,
  useImageZoom,
} from "react-image-zoom-lightbox";

const SingleImageExample = () => {
  const {
    isOpen,
    selectedImage,
    openZoom,
    closeZoom,
  } = useImageZoom();

  const imageUrl = "/images/product-preview.jpg";

  return (
    <div style={{ padding: "20px" }}>
      <h2>Image Zoom Example</h2>

      <img
        src={imageUrl}
        alt="Product preview"
        onClick={() => openZoom(imageUrl)}
        style={{
          width: "250px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      />

      <ImageZoomModal
        isOpen={isOpen}
        src={selectedImage}
        onClose={closeZoom}
      />
    </div>
  );
};

export default SingleImageExample;
```

That's it. No additional configuration is required.

---

## 🎨 Custom CSS Styling

This package ships with its own custom CSS and does not require Tailwind CSS.

If you want to customize the look further, you can override the class names in the bundled stylesheet or add your own CSS classes with a higher specificity.

---

# 🛍️ Use Cases

## E-Commerce Product Gallery

The lightbox is useful for product galleries where users need to inspect details such as materials, textures, stitching, colors, or other high-resolution details.

```tsx
import React from "react";
import {
  ImageZoomModal,
  useImageZoom,
} from "react-image-zoom-lightbox";

const productImages = [
  {
    id: 1,
    thumb: "/shop/shoe-side-thumb.jpg",
    full: "/shop/shoe-side-hd.jpg",
    title: "Side View",
  },
  {
    id: 2,
    thumb: "/shop/shoe-sole-thumb.jpg",
    full: "/shop/shoe-sole-hd.jpg",
    title: "Sole Detail",
  },
  {
    id: 3,
    thumb: "/shop/shoe-top-thumb.jpg",
    full: "/shop/shoe-top-hd.jpg",
    title: "Top View",
  },
];

const ProductGallery = () => {
  const {
    isOpen,
    selectedImage,
    openZoom,
    closeZoom,
  } = useImageZoom();

  return (
    <div className="flex gap-4 p-4">
      {productImages.map((image) => (
        <button
          key={image.id}
          type="button"
          onClick={() => openZoom(image.full)}
          className="group cursor-pointer"
        >
          <img
            src={image.thumb}
            alt={image.title}
            className="h-32 w-32 rounded-lg border object-cover transition group-hover:opacity-80"
          />

          <p className="mt-1 text-center text-xs text-gray-600">
            {image.title}
          </p>
        </button>
      ))}

      <ImageZoomModal
        isOpen={isOpen}
        src={selectedImage}
        onClose={closeZoom}
        maxScale={5}
        minScale={1}
        step={0.8}
      />
    </div>
  );
};

export default ProductGallery;
```

---

## 🎨 Custom Controls with `lucide-react`

You can replace the default controls with icons from libraries such as `lucide-react`, `react-icons`, or your own React components.

```tsx
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
} from "lucide-react";

<ImageZoomModal
  isOpen={isOpen}
  src={selectedImage}
  onClose={closeZoom}
  zoomInIcon={<ZoomIn size={20} />}
  zoomOutIcon={<ZoomOut size={20} />}
  resetIcon={<RotateCcw size={20} />}
  closeIcon={<X size={20} />}
/>
```

> `lucide-react` is not a dependency of `react-image-zoom-lightbox`. It is only used here as an example of a custom icon source.

---

# 🧩 API Reference

## `ImageZoomModal`

The main component responsible for displaying the zoomable image inside a lightbox modal.

### Props

| Prop          | Type              | Default            | Description                                                |
| ------------- | ----------------- | ------------------ | ---------------------------------------------------------- |
| `isOpen`      | `boolean`         | Required           | Controls whether the lightbox is visible.                  |
| `src`         | `string \| null`  | Required           | Image URL displayed inside the lightbox.                   |
| `onClose`     | `() => void`      | Required           | Callback called when the lightbox is closed.               |
| `alt`         | `string`          | `"Zoomable image"` | Alternative text for the image.                            |
| `maxScale`    | `number`          | `4`                | Maximum zoom scale.                                        |
| `minScale`    | `number`          | `1`                | Minimum zoom scale.                                        |
| `step`        | `number`          | `0.5`              | Zoom increment/decrement applied by the controls.          |
| `className`   | `string`          | `""`               | Optional custom CSS or Tailwind classes for the container. |
| `zoomInIcon`  | `React.ReactNode` | Built-in SVG       | Custom icon for the zoom-in control.                       |
| `zoomOutIcon` | `React.ReactNode` | Built-in SVG       | Custom icon for the zoom-out control.                      |
| `resetIcon`   | `React.ReactNode` | Built-in SVG       | Custom icon for the reset-zoom control.                    |
| `closeIcon`   | `React.ReactNode` | Built-in SVG       | Custom icon for the close control.                         |

### Example

```tsx
<ImageZoomModal
  isOpen={isOpen}
  src={selectedImage}
  onClose={closeZoom}
  alt="Product image"
  maxScale={5}
  minScale={1}
  step={0.5}
/>
```

---

# 🪝 `useImageZoom`

The `useImageZoom` hook provides simple state management for opening and closing the image zoom modal.

### Usage

```tsx
const {
  isOpen,
  selectedImage,
  openZoom,
  closeZoom,
} = useImageZoom();
```

### Return Values

| Property        | Type                    | Description                                        |
| --------------- | ----------------------- | -------------------------------------------------- |
| `isOpen`        | `boolean`               | Indicates whether the lightbox is currently open.  |
| `selectedImage` | `string \| null`        | Contains the currently selected image URL.         |
| `openZoom`      | `(src: string) => void` | Opens the lightbox with the specified image.       |
| `closeZoom`     | `() => void`            | Closes the lightbox and clears the selected image. |

### Example

```tsx
const {
  isOpen,
  selectedImage,
  openZoom,
  closeZoom,
} = useImageZoom();

const handleImageClick = () => {
  openZoom("/images/example.jpg");
};
```

---

# 🎛️ Zoom Configuration

You can control zoom behavior using `minScale`, `maxScale`, and `step`.

```tsx
<ImageZoomModal
  isOpen={isOpen}
  src={selectedImage}
  onClose={closeZoom}
  minScale={1}
  maxScale={6}
  step={0.5}
/>
```

For example:

* `minScale={1}` → Normal image size
* `maxScale={6}` → Maximum 6x zoom
* `step={0.5}` → Zoom changes by 0.5x per control action

---

# ♿ Accessibility

The component includes basic accessibility features such as:

* `alt` text support for images.
* Keyboard `Escape` support for closing the modal.
* Button-based controls for interactive actions.
* Customizable control icons.

For best accessibility, always provide a meaningful `alt` value.

```tsx
<ImageZoomModal
  isOpen={isOpen}
  src={selectedImage}
  onClose={closeZoom}
  alt="Red leather running shoe - side view"
/>
```

---

# ⚡ Why `react-image-zoom-lightbox`?

If you need a simple image zoom experience without adding a large gallery or UI library to your project, `react-image-zoom-lightbox` provides the essential functionality through a small and straightforward API.

### Ideal for

* 🛍️ E-commerce product galleries
* 🖼️ Photography portfolios
* 🎨 Art galleries
* 🏠 Real-estate image previews
* 📱 Mobile image viewers
* 📄 Documentation screenshots
* 🧑‍🎨 Portfolio websites
* 🔎 Product detail pages

---

# 📄 License

This package is licensed under the [MIT License](https://github.com/mhrafi21/react-image-zoom-lightbox/blob/main/LICENSE).

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you find a bug or have an idea for improving the project, please open an issue or submit a pull request on GitHub.

---

# 🔗 Links

* [npm Package](https://www.npmjs.com/package/react-image-zoom-lightbox)
* [GitHub Repository](https://github.com/mhrafi21/react-image-zoom-lightbox)
* [License](https://github.com/mhrafi21/react-image-zoom-lightbox/blob/main/LICENSE)

---

## ⭐ Support

If you find `react-image-zoom-lightbox` useful, consider giving the project a ⭐ on GitHub and sharing it with other React developers.
# react-image-zoom-lightbox
