function Calculate() {
  return (
    // <div style={{ textAlign: 'center' }}>
    //     <h1>Embed a Website</h1>
    //     <iframe
    //         src="https://osd101.ldd.go.th/search_fertilizer.php"
    //         width="100%"
    //         height="700px"
    //         style={{ border: 'none' }}
    //         title="Embedded Website"
    //     ></iframe>
    // </div>
    <div className="flex flex-col bg-white border shadow-sm rounded-xl">
      <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
        <p className="mt-1 text-sm text-gray-500">คำนวณหาสูตรปุ๋ยที่เหมาะสม</p>
      </div>
      <div className="max-w-sm space-y-3">
        <div>
          <label
            htmlFor="hs-trailing-icon"
            className="block text-sm font-medium mb-2"
          >
            พืช
          </label>
          <div className="hs-dropdown relative inline-flex">
            <button
              id="hs-dropdown-default"
              type="button"
              className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              ระบุพืช
              <svg
                className="hs-dropdown-open:rotate-180 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-default"
            >
              <div className="p-1 space-y-0.5">
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                  ชื่อพืช
                </a>
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                  ชื่อพืช
                </a>
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                  ชื่อพืช
                </a>
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                  ชื่อพืช
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculate;
