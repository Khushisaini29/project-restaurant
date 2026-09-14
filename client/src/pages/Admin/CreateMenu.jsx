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
});
  const [images, setImage] = useState([]);
  const [previews, setpreview] = useState([]);
  const [submitting, setsubmitting] = useState(false);
  const [mode, setmode] = useState(true);
  const { createFoodMenu, getOnefood, updateFoodMenu } = FoodStore();
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addFiles = (filesArray) => {
    console.log(filesArray);

    const previewArray = [];

    for (let image of filesArray) {
      previewArray.push(URL.createObjectURL(image));
    }
    setpreview(previewArray);
    // console.log(typeof filesArray);
    // let imageArr = [];
    const files = Array.from(filesArray);
    setImage(files);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setsubmitting(true);
    updateFoodMenu({ ...form, ["id"]: id }).then(() => {
      setsubmitting(false);
      setform({});
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsubmitting(true);
    let formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key == "price") {
        formData.append(key, value);
      } else {
        formData.append(key, String(value).toLowerCase());
      }
    });
    formData.append("isAvailable", true);
    images.forEach((image) => {
      formData.append("foodImage", image);
    });
    console.log(formData);

    createFoodMenu(formData).then(() => {
      setsubmitting(false);
      setform({ name: "", description: "", price: 0, category: "" });
      setpreview([]);
      setImage([]);
    });
  };

  let errors = "";
  useEffect(() => {
    console.log(id);
    if (id == undefined) {
      console.log("you are in create mode");
    } else {
      setmode(false);
      console.log("you are in update mode");
      getOnefood(id).then((value) => {
        console.log("this is value", value);
        setform({
          name: value.name,
          description: value.description,
          category: value.category,
          price: value.price,
        });
      });
    }
  }, []);
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-semibold mb-6">
        {mode ? "Upload New Menu" : "Update Menu"}
      </h1>

      <form className="space-y-5" onSubmit={mode ? handleSubmit : handleUpdate}>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <div
            onClick={() => document.getElementById("fileInput").click()}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-gray-300"
          >
            <input
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              hidden
              onChange={(e) => addFiles(e.target.files)}
            />
            <p className="text-sm text-gray-500">
              Drag & drop images here, or click to browse
            </p>
          </div>
          {errors.images && (
            <p className="text-red-600 text-xs mt-1">{errors.images}</p>
          )}

          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {previews.map((src, i) => (
                <div key={src} className="relative group">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    // onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {mode && (
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
          >
            {submitting ? "Uploading ...." : " Create Menu Item"}
          </button>
        )}
        {!mode && (
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
          >
            {submitting ? "Updatinng ...." : " Update Menu"}
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateMenu;