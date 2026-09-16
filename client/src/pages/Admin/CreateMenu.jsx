import { useEffect, useState } from "react";
import FoodStore from "../../store/FoodStore";
import { useParams } from "react-router";

const CreateMenu = () => {
  const { id } = useParams();

  const [form, setform] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    isAvailable: true,
  });

  const [images, setImage] = useState([]);
  const [previews, setpreview] = useState([]);
  const [submitting, setsubmitting] = useState(false);
  const [mode, setmode] = useState(true);

  const {
    createFoodMenu,
    getOnefood,
    updateFoodMenu,
  } = FoodStore();

  // =========================
  // Handle Input Change
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setform({
      ...form,
      [name]:
        name === "isAvailable"
          ? value === "true"
          : value,
    });
  };

  // =========================
  // Add Images
  // =========================
  const addFiles = (filesArray) => {
    if (!filesArray) return;

    const files = Array.from(filesArray);

    const previewArray = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImage((prev) => [...prev, ...files]);
    setpreview((prev) => [...prev, ...previewArray]);
  };

  // =========================
  // Remove Image
  // =========================
  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);

    setImage((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setpreview((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =========================
  // Handle Update
  // =========================
  const handleUpdate = (e) => {
    e.preventDefault();

    setsubmitting(true);

    updateFoodMenu({
      ...form,
      id,
    })
      .then(() => {
        setsubmitting(false);

        setform({
          name: "",
          description: "",
          price: 0,
          category: "",
          isAvailable: true,
        });

        setpreview([]);
        setImage([]);
      })
      .catch((error) => {
        console.log("Update Error:", error);
        setsubmitting(false);
      });
  };

  // =========================
  // Handle Create
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    setsubmitting(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "price") {
        formData.append(key, value);
      } else if (key === "isAvailable") {
        formData.append(key, value);
      } else {
        formData.append(
          key,
          String(value).toLowerCase()
        );
      }
    });

    // Add Images
    images.forEach((image) => {
      formData.append("foodImage", image);
    });

    createFoodMenu(formData)
      .then(() => {
        setsubmitting(false);

        setform({
          name: "",
          description: "",
          price: 0,
          category: "",
          isAvailable: true,
        });

        previews.forEach((url) =>
          URL.revokeObjectURL(url)
        );

        setpreview([]);
        setImage([]);
      })
      .catch((error) => {
        console.log("Create Error:", error);
        setsubmitting(false);
      });
  };

  // =========================
  // Get Food For Update
  // =========================
  useEffect(() => {
    if (id === undefined) {
      setmode(true);
      return;
    }

    setmode(false);

    getOnefood(id)
      .then((value) => {
        setform({
          name: value.name || "",
          description: value.description || "",
          category: value.category || "",
          price: value.price || 0,
          isAvailable:
            value.isAvailable ?? true,
        });
      })
      .catch((error) => {
        console.log("Get Food Error:", error);
      });
  }, [id]);

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#F8F3EA] px-6 py-12">
      <div className="mx-auto max-w-3xl">

        {/* =========================
            Page Heading
        ========================= */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#C89B5D]">
            Restaurant Menu
          </p>

          <h1 className="font-serif text-4xl font-normal text-[#171512] md:text-5xl">
            {mode ? "Create Menu" : "Update Menu"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#8F887F]">
            {mode
              ? "Add a new dish to your restaurant menu."
              : "Update the details of this menu item."}
          </p>
        </div>

        {/* =========================
            Form Card
        ========================= */}
        <div className="border border-[#E5DDD2] bg-white p-6 shadow-sm md:p-8">

          <form
            className="space-y-6"
            onSubmit={
              mode ? handleSubmit : handleUpdate
            }
          >

            {/* =========================
                Food Name
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#171512]">
                Food Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Truffle Pasta"
                className="w-full border border-[#D8CFC3] bg-[#FCFAF7] px-4 py-3 text-sm text-[#171512] outline-none transition focus:border-[#C89B5D] focus:ring-1 focus:ring-[#C89B5D]"
                required
              />
            </div>

            {/* =========================
                Description
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#171512]">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your dish..."
                className="w-full resize-none border border-[#D8CFC3] bg-[#FCFAF7] px-4 py-3 text-sm text-[#171512] outline-none transition focus:border-[#C89B5D] focus:ring-1 focus:ring-[#C89B5D]"
                required
              />
            </div>

            {/* =========================
                Price + Category
            ========================= */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#171512]">
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8F887F]">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-[#D8CFC3] bg-[#FCFAF7] py-3 pl-9 pr-4 text-sm text-[#171512] outline-none transition focus:border-[#C89B5D] focus:ring-1 focus:ring-[#C89B5D]"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#171512]">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full cursor-pointer border border-[#D8CFC3] bg-[#FCFAF7] px-4 py-3 text-sm text-[#171512] outline-none transition focus:border-[#C89B5D] focus:ring-1 focus:ring-[#C89B5D]"
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="all">
                    All
                  </option>

                  <option value="breakfast">
                    Breakfast
                  </option>

                  <option value="lunch">
                    Lunch
                  </option>

                  <option value="dinner">
                    Dinner
                  </option>

                  <option value="snacks">
                    Snacks
                  </option>

                  <option value="dessert">
                    Dessert
                  </option>

                  <option value="drinks">
                    Drinks
                  </option>
                </select>
              </div>
            </div>

            {/* =========================
                Availability
            ========================= */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[#171512]">
                Availability
              </label>

              <div className="flex flex-wrap gap-8">

                {/* Available */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="isAvailable"
                    value="true"
                    checked={
                      form.isAvailable === true
                    }
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#C89B5D]"
                  />

                  <span className="text-sm font-medium text-[#397548]">
                    Available
                  </span>
                </label>

                {/* Not Available */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="isAvailable"
                    value="false"
                    checked={
                      form.isAvailable === false
                    }
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#A33D3D]"
                  />

                  <span className="text-sm font-medium text-[#A33D3D]">
                    Not Available
                  </span>
                </label>

              </div>
            </div>

            {/* =========================
                Image Upload
            ========================= */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#171512]">
                Food Images
              </label>

              <div
                onClick={() =>
                  document
                    .getElementById("fileInput")
                    .click()
                }
                className="cursor-pointer border-2 border-dashed border-[#D8CFC3] bg-[#FCFAF7] px-6 py-10 text-center transition hover:border-[#C89B5D] hover:bg-[#FAF6EF]"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F3EEE7] text-xl text-[#C89B5D]">
                  +
                </div>

                <p className="text-sm font-medium text-[#171512]">
                  Add food images
                </p>

                <p className="mt-1 text-xs text-[#8F887F]">
                  PNG or JPG · Multiple images
                  allowed
                </p>

                <input
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  hidden
                  onChange={(e) =>
                    addFiles(e.target.files)
                  }
                />
              </div>

              {/* =========================
                  Image Preview
              ========================= */}
              {previews.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

                  {previews.map((src, i) => (
                    <div
                      key={src}
                      className="group relative overflow-hidden border border-[#E5DDD2] bg-[#FCFAF7]"
                    >
                      <img
                        src={src}
                        alt={`preview-${i}`}
                        className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() =>
                          removeImage(i)
                        }
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#171512] text-lg leading-none text-white transition hover:bg-red-600"
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* =========================
                Submit Button
            ========================= */}
            <div className="border-t border-[#E5DDD2] pt-6">

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#C89B5D] px-6 py-3.5 text-sm font-semibold text-[#171512] transition hover:bg-[#B88A4E] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? mode
                    ? "Uploading..."
                    : "Updating..."
                  : mode
                  ? "Create Menu Item"
                  : "Update Menu"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateMenu;