import "./Page404.css";

function Page404(): JSX.Element {
    return (
      <div className="Page404 text-center">
        <h1 className="mb-5">Not Found</h1>
        <iframe
          allow="fullscreen"
          frameBorder="0"
          height="270"
          src="https://giphy.com/embed/702ybfQFkrkrWnIByR/video"
          width="480"
        ></iframe>
      </div>
    );
}

export default Page404;
