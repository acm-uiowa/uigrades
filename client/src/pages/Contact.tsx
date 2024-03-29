import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import Footer from "../components/Footer.tsx";
import Loading from "../components/Loading.tsx";
import Navbar from "../components/Navbar.tsx";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface FormDataInterface {
  name: string;
  value: string;
}

const Contact:React.FC = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const pageRef = useRef(null)

  useEffect(() => {
    // @ts-ignore
    pageRef.current.scrollIntoView()
    document.title = "UIGrades | Contact";
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "de4c836a-d8df-45b4-a690-b2221217e60c");
    //my personal key for testing formData.append("access_key", "de10e37b-617c-4ddb-967e-1392e2c7ebc2")

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    setLoading(false);
    if (res.success) {
      setResult(res.message);
      // Clear the form inputs
      setFormData({ name: "", email: "", message: "" });
    } else {
      setResult(res.message);
    }
    setTimeout(() => {
      setResult("");
    }, 4000);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value }: FormDataInterface = event.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div ref={pageRef} className="w-full flex justify-center items-center flex-col relative min-h-screen bg-dark">
      <Navbar/>
      <div className="flex flex-col justify-start items-center min-h-screen gap-10 w-full">
          <div className="flex justify-center items flex-col w-full text-zinc-300 text-center gap-5 mt-10 px-4">
              <h1 className="text-4xl md:text-7xl font-bold text-primary">Questions or Concerns?</h1>
              <p className="text-xl md:text-4xl">Reach out to us to stay up to date or report any issues you encounter</p>
          </div>
          <form className="flex justify-center items-center flex-col gap-5 w-full text-white py-10 max-w-[400px] mx-auto px-8 sm:px-0" onSubmit={onSubmit}>
            <div className="w-full h-20 text-sm">
              <label htmlFor='name' className="mb-[-30px] pl-5 pt-10 text-zinc-300 z-50 flex relative opacity-80">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Leo"
                required
                className="w-full h-full relative py-10 px-5 pb-3 text-zinc-300 rounded-2xl outline outline-1 opacity-70 focus:opacity-100 focus:outline focus:outline-zinc-300 bg-zinc-800 transition duration-200"
              />
            </div>
            <div className="w-full h-20 text-sm">
              <label htmlFor='email' className="mb-[-30px] pl-5 pt-10 text-zinc-300 z-50 flex relative opacity-80">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="leo@email.com"
                required
                className="w-full h-full relative py-10 px-5 pb-3 relative text-zinc-300 rounded-2xl outline outline-1 opacity-70 focus:opacity-100 focus:outline focus:outline-zinc-300 bg-zinc-800 transition duration-200"
              />
            </div>
            <div className="w-full h-40 text-sm">
              <label htmlFor='message' className="mb-[-30px] pl-5 pt-10 text-zinc-300 z-50 flex relative opacity-80">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message here"
                required
                className="w-full h-full relative py-10 px-5 pb-3 relative text-zinc-300 rounded-2xl outline outline-1 opacity-70 focus:opacity-100 focus:outline focus:outline-zinc-300 bg-zinc-800 transition duration-200"
              />
            </div>
              {loading ? <div className="mt-10"><Loading small/></div> : <button type="submit" className={`mt-10 ${!formData.name || !formData.email || !formData.message ? 'cursor-not-allowed' : 'main-button-n'}`}>
                <div className="main-button-inner">
                  <div className="main-button-text">Submit</div>
                </div>
              </button>}
              <p className="text-zinc-300 text-center h-20">{result}</p>
          </form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
