import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Form>
      <label htmlFor="termsCheck">I agree to Terms and Conditions</label>
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
