import { useState } from "react"
import emailjs from "emailjs-com"
import SEO from "../components/SEO"

function Support() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await emailjs.send("service_svxtn0d", "template_vx70ysf", { email, message,}, "6pRF5XaBmj1du2b9k")
      setStatus("Message sent successfully!")
      setEmail("")
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("Failed to send message. Please try again.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
       <SEO 
          title="Support"
          image="https://res.cloudinary.com/dydnhyxfh/image/upload/v1739117770/image-BJEpBNn-_fwo_Wxqsv9Dn_bhtclg.webp"
          description="Browse anonymous posts and share your thoughts freely." 
      />
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
          Support
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          If you need to request deletion of a post or have any other concerns, please fill out the form below:
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            id="message"
            label="Post Link & Message"
            type="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
          />
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 transform hover:scale-101"
          >
            Send Message
          </button>
        </form>
        {status && (
          <div className={`mt-6 p-4 rounded-lg ${
            status.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  )
}

function FormField({ id, label, type, value, onChange, required, rows }) {
  const baseClasses = "w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"

  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        {label}:
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  )
}

export default Support