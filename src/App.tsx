import "./App.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  name: string;
  date: string;
  subject: string;
  description: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required!"),
  date: yup.string().required("Date is required!"),
  subject: yup.string().required("Select a subject!"),
  description: yup
    .string()
    .required("Description is required!")
    .min(10, "Description need at least 10 carachters"),
});

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      date: "",
      subject: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div>
      <h1>Event </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <input type="text" placeholder="Name of the event" {...field} />
          )}
        />

        {errors.name?.message && (
          <span className="error">{errors.name.message}</span>
        )}

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <input type="date" placeholder="Name of the event" {...field} />
          )}
        />

        {errors.date?.message && (
          <span className="error">{errors.date.message}</span>
        )}

        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <select {...field}>
              <option value="" disabled>
                Select...
              </option>

              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
              <option value="javascript">Javascript</option>
              <option value="typescript">Typescript</option>
            </select>
          )}
        />

        {errors.subject?.message && (
          <span className="error">{errors.subject.message}</span>
        )}

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <textarea placeholder="Description" rows={4} {...field} />
          )}
        />

        {errors.description?.message && (
          <span className="error">{errors.description.message}</span>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
