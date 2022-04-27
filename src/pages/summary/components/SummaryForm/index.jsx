import { useState } from "react";
import { Button, Form, Popover, OverlayTrigger } from "react-bootstrap";

const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  return (
    <Form>
      <label htmlFor="termsCheck">
        I agree to
        <OverlayTrigger placement="right" overlay={popover}>
          <span style={{ color: "blue" }}> Terms and Conditions</span>
        </OverlayTrigger>
      </label>

      <Form.Check
        id="termsCheck"
        type="checkbox"
        onChange={(e) => setIsChecked(e.target.checked)}
      />

      <Button disabled={!isChecked}>Confirm order</Button>
    </Form>
  );
};

export default SummaryForm;
