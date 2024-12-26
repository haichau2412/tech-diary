import H1 from "../shared/h1";

const TestingStrategy = () => {
  return (
    <div className="blog customScrollBar blue">
      <H1>Testing strategy</H1>

      <p>
        If you want to learn more about how I code, check{" "}
        <a
          href="https://github.com/goldbergyoni/nodebestpractices"
          target="_blank"
        >
          Node.js Best Practices
        </a>
      </p>

      <p>
        Testing should be intuitive and simple. By reading the test, you should
        immediately understand what the code does. If you need to read the code
        to understand the test, then the test is not well written. You can
        choose to opt out testing as it is not mandatory.
      </p>

      <h2>Testing static pages</h2>
      <p>Snapshot testing is sufficient</p>
      <p>
        If the static page is complex: Combine snapshot testing with content
        checks, accessibility test
      </p>
      <p>If the page is simple and trivial, we can skip tests</p>

      <h2>For Pure components </h2>
      <p>
        We write test to verify that the components renders correctly with given
        props. We especially need to to it when we have conditional rendering
        inside the component.
      </p>

      <h2>Into details for specific components </h2>
      <ul>
        <li>
          <h3>Component with Form</h3>
          <p>Change input - Check validation before submit</p>
        </li>

        <li>
          <h3>Component with API call</h3>
          <p>Mock API call - Check loading state</p>
        </li>
        <li>
          <h3>Component with User Interaction</h3>
          <p>Mock user action - Check event</p>
        </li>
        <li>
          <h3>Component with State</h3>
          <p>Change state - Check state change</p>
        </li>
        <li>
          <h3>Component with Props</h3>
          <p>Change props - Check props change</p>
        </li>
        <li>
          <h3>Component with Redux</h3>
          <p>Change redux state - Check redux state change</p>
        </li>
        <li>
          <h3>Component with Router</h3>
          <p>Change route - Check route change</p>
        </li>
      </ul>
    </div>
  );
};

export default TestingStrategy;
