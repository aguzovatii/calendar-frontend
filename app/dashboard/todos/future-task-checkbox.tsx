import { Task } from "../../types";

export default function FutureTaskCheckbox({ task }: { task: Task }) {
  return (
    <div className="flex flex-row w-full border rounded-md p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cursor-not-allowed w-[30px]"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
      <div className="flex w-full truncate">
        <div className="flex truncate relative">
          <label
            className="flex mx-1 truncate text-2xl font-medium leading-none"
            htmlFor={task.id}
          >
            <p className="truncate">{task.name}</p>
          </label>
          <div className="absolute top-1/2 h-0.5" />
        </div>
      </div>
    </div>
  );
}
