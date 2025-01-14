"use client";

export default function SignupFormFallback() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="firstName">
              First name
            </label>
            <input
              className="rounded-md border px-3 py-2 text-sm ring-accent-gray-200 ring-offset-2 focus-visible:ring-2"
              id="firstName"
              name="firstName"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="lastName">
              Last name
            </label>
            <input
              className="rounded-md border px-3 py-2 text-sm ring-accent-gray-200 ring-offset-2 focus-visible:ring-2"
              id="lastName"
              name="lastName"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md border px-3 py-2 text-sm ring-accent-gray-200 ring-offset-2 focus-visible:ring-2"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="password">
            Password (8+ characters)
          </label>
          <input
            className="rounded-md border px-3 py-2 text-sm ring-accent-gray-200 ring-offset-2 focus-visible:ring-2"
            id="password"
            name="password"
            required
            type="password"
            minLength={8}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="rounded-md border px-3 py-2 text-sm ring-accent-gray-200 ring-offset-2 focus-visible:ring-2"
            id="confirmPassword"
            required
            type="password"
            minLength={8}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="role">
            Role
          </label>
          <div className="relative">
            <select
              id="role"
              name="role"
              className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option disabled>Select a role</option>
              <option value={"Athlete"}>Athlete</option>
              <option value={"Head Coach"}>Head Coach</option>
              {/* <option value={"Assistant Coach"}>Assistant Coach</option> */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                height={20}
                width={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#000000"
                    className="stroke-accent-gray-300"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <button
          className="flex-center w-full rounded-md bg-accent-green-100 px-4 py-2 text-sm font-medium text-white hover:bg-accent-green-100/90 disabled:cursor-not-allowed disabled:bg-accent-green-100/50"
          type="submit"
          disabled
        >
          Create My Account
        </button>
      </div>
    </form>
  );
}
