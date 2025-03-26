function AboutMe({ onClose }: { onClose: () => void }) {
  return (
    <>
      <button
        className="absolute top-4 right-4 bg-transparent border-none
         text-xl cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>

      <h3 className="text-gray-800 text-xl font-semibold mt-0 mb-4">
        About Me
      </h3>

      <figure>
        <img className="rounded-2xl shadow" src="hami.jpg" />
        <figcaption className="text-xs text-gray-500 mt-2 mb-6">
          Meet my cat, Hami!
        </figcaption>
      </figure>

      <p className="mb-4">
        Hello, I am <strong className="font-medium">Moohaeng Sohn</strong> (Alex
        is my preferred name). I am a graduate from UofT, majoring in Computer
        Science and minor in Statistics and Mathematics.
      </p>

      <p className="mb-4">
        I am currently looking for a full-time software developer role, so if
        you liked my work, and would like to hire me, please click{" "}
        <a
          href="https://www.linkedin.com/in/moohaeng-sohn/"
          className="underline"
        >
          here
        </a>{" "}
        for my LinkedIn, or contact me directly at{" "}
        <a className="underline" href="mailto:alexsohn1126@gmail.com">
          alexsohn1126@gmail.com
        </a>
        !
      </p>

      <p className="mb-4">
        If you would like to learn more about what I do/did, either check out{" "}
        <a
          className="underline cursor-pointer"
          href="https://alexsohn1126.github.io"
        >
          my portfolio website
        </a>
        , or my{" "}
        <a
          className="underline cursor-pointer"
          href="https://alexsohn1126.github.io"
        >
          my github
        </a>
        .
      </p>

      <p className="mb-4">Thank you!</p>
    </>
  );
}

export default AboutMe;
