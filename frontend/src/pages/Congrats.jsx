import "./Congrats.css";

const Congrats = () => {
  return (
    <div className='congrats-cont'>
        <div className="content">
            <h2>Congrats Your Message is Sent!</h2>
            <p>You will be responded in 1-2 days about your project for further discussion.</p>
            <button onClick={() => window.location.href="/"}>Return To Home Page</button>
        </div>
    </div>
  )
}

export default Congrats;