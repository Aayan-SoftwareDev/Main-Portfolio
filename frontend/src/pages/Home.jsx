import { useState } from "react";
import "./Home.css";
import api from "../lib/axios.js";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = ({setIsSuccess}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [idea, setIdea] = useState("");
    const [plan, setPlan] = useState("basic");
    const [customSol, setCustomSol] = useState("");
    const [send, setSend] = useState(false);
    const navigate = useNavigate();

    const sendMessage = async () => {
        if(!email || !name || !phone || !idea || (!customSol && !plan)){
            toast.error("Please in fill all the information.")
            return;
        }
        try {
            setSend(true);
            const payload = {
                email,
                name,
                phone,
                idea,
                ...(customSol ? { customSolution: customSol } : { plan })
            }
            const res = await api.post("/webhook/msg-create", payload);
            if(res.status == 201 || res.status == 200){
                setIsSuccess(true);
                toast.success("Message Sent!");
                navigate("/success");
                return true;
            } else {
                throw new Error("Unexpected response status");
            }
        } catch(e) {
            const serverMsg = e.response?.data?.message || "Server error!";
            console.error(`Error at sendMessage:`, e);
            toast.error(serverMsg);
        } finally {
            setSend(false);
        }
    }
  return (
    <div>
    <div className="hero">
        <div className="hero-content">
            <h2>Get Your Website Built!</h2>
            <p>We specialize in custom website development and custom ecommerce solutions, that are user friendly, easy to navigate and build to convert.</p>
        </div>
        <button onClick={() => window.location.href="#getInTouch"}>Send a Message</button>
    </div>
        <div className="solutions" id="solutions">
            <div className="solutions-content">
                <p>Solutions we offer</p>
            </div>
            <div className="solutions-card">
                <div className="card">
                    <p className="title">Custom Web Page Development</p>
                    <p className="description">Beautiful Web Pages that look amazing and eye-catching. Astonishing looks with style.</p>
                    <a href="https://ilmify.store">view demo verison</a>
                </div>
                <div className="card">
                    <p className="title">Custom Ecommerce Website Development</p>
                    <p className="description">Custom Ecommerce Websites that are easy to use, user-friendly navigation and are build to convert customers.</p>
                    <a href="https://ilmify.store">view demo verison</a>
                </div>
                <div className="card">
                    <p className="title">Customer Support Agent</p>
                    <p className="description">AI powered Customer Support Agents that are designed to answer customers' questions effectively.</p>
                    <a href="https://ilmify.store">view demo verison</a>
                </div>
                <div className="card">
                    <p className="title">Email Marketing</p>
                    <p className="description">Klaviyo Email Marketing, designed for customer engagment. Shopify integration with Klaviyo to maximize performance.</p>
                    <a href="https://ilmify.store">view demo verison</a>
                </div>
            </div>
        </div>
        <div className="pricing" id="pricing">
            <div className="pricing-content">
                <p>Pricing</p>
            </div>
            <div className="pricing cards">
                <div className="card">
                    <p className="title">Basic</p>
                    <p className="price">PKR 9,999</p>
                    <div className="includes">
                        <ul>
                            <li>Single Page Website</li>
                            <li>Beatiful Webpage</li>
                            <li>Good and attractive UI</li>
                            <li>Whatsapp Integration</li>
                            <li>Eye-Catching</li>
                            <li>Built in 7 days</li>
                        </ul>
                    </div>
                    <button onClick={() => window.location.href="#getInTouch"}>Get it built</button>
                </div>
                <div className="card">
                    <p className="title">Standard</p>
                    <p className="price">PKR 25,999</p>
                    <div className="includes">
                        <ul>
                            <li>Multipage Ecommerce Store</li>
                            <li>Full Admin panel</li>
                            <li>Automatic Order Booking with InstaWorld</li>
                            <li>SEO Optimized</li>
                            <li>Whatsapp Integration</li>
                            <li>Built in 15-25 days</li>
                        </ul>
                    </div>
                    <button onClick={() => window.location.href="#getInTouch"}>Get it built</button>
                </div>
                <div className="card">
                    <p className="title">Advance</p>
                    <p className="price">PKR 35,999</p>
                    <div className="includes">
                        <ul>
                            <li>Multipage Ecommerce Store</li>
                            <li>Full Admin panel</li>
                            <li>Automatic Order Booking with InstaWorld</li>
                            <li><em>AI Email Customer Service Bot</em></li>
                            <li>SEO Optimized</li>
                            <li>Whatsapp Integration</li>
                            <li>Built in 15-30 days</li>
                        </ul>
                    </div>
                    <button onClick={() => window.location.href="#getInTouch"}>Get it built</button>
                </div>
            </div>
        </div>
        <div className="getInTouch" id="getInTouch">
            <div className="getInTouchContent">
                <p className="company-name">Aayan</p>
                <p className="company-info">We specialize in custom website development and custom ecommerce solutions, that are user friendly, easy to navigate and build to convert.</p>
                <p className="email">aayan.softwaredev@gmail.com</p>
                <p>Send a message to us for what you want us to build</p>
            </div>
            <div className="form">
                <label>Good Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
                <label>Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                <label>Whatsapp Number</label>
                <input type="text" placeholder="03XX-XXXXXXX" onChange={(e) => setPhone(e.target.value)}/>
                <label>Describe your Idea</label>
                <textarea placeholder="Tell us about your idea or project..." onChange={(e) => setIdea(e.target.value)}/>
                <hr />
                <label>Select Plan</label>
                <select name="plan" id="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Advance">Advance</option>
                </select>
                <p>OR</p>
                <label>Custom Solution</label>
                <input type="text" placeholder="please enter solution" onChange={(e) => setCustomSol(e.target.value)}/>
                <button onClick={sendMessage}>{send ? "Sending Message" : "Send Message!"}</button>
            </div>
        </div>
    </div>
  )
}

export default Home;