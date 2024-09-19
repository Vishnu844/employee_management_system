export const columns = [
  "_id",
  "image",
  "name",
  "email",
  "mobile",
  "designation",
  "gender",
  "course",
  "created_date",
  "action",
];

export const fields = [
  {
    label: "Name",
    type: "text",
    name: "name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Mobile",
    type: "text",
    name: "mobile",
  },
  {
    label: "Designation",
    options: ["HR", "Manager", "Sales"],
    tag: "select",
    name: "designation",
  },
  {
    label: "Gender",
    options: [
      { label: "male", type: "radio" },
      { label: "female", type: "radio" },
    ],
    tag: "radio",
    name: "gender",
  },
  {
    label: "Course",
    options: ["MCA", "BCA", "BSC"],
    tag: "select",
    name: "course",
  },
  {
    label: "Image",
    type: "file",
    name: "image",
  },
];
