const ContactForm = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
        <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md md:max-w-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Contact Us
          </h1>
          <div className="space-y-4">
            <label htmlFor="email" className="block">
              <p className="text-gray-700 font-medium mb-2">Email:</p>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </label>
            <label htmlFor="message" className="block">
              <p className="text-gray-700 font-medium mb-2">Message:</p>
              <textarea
                id="message"
                placeholder="Write your message here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32 resize-none"
              />
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default ContactForm;
  