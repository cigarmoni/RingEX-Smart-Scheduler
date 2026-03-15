# Stepper / Step / StepButton

```tsx
import { Stepper, Step, StepButton } from '@ringcentral/spring-ui';
```

## Stepper Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `activeStep` | `number` | — | Index of the active step |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `nonLinear` | `boolean` | — | Allow clicking any step |
| `connector` | `ReactNode` | — | Custom connector element |
| `fixedStepWidth` | `number` | — | Fixed width for each step |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | Step elements |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Step Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `active` | `boolean` | — | Active state (auto-set by Stepper) |
| `completed` | `boolean` | — | Completed state |
| `disabled` | `boolean` | — | Disabled state |
| `variant` | `string` | — | Step variant |
| `expanded` | `boolean` | — | Expanded (vertical stepper) |
| `index` | `number` | — | Step index (auto-set) |
| `last` | `boolean` | — | Last step (auto-set) |
| `id` | `string` | — | Step ID |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | StepButton or StepLabel |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## StepButton Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Custom step icon |
| `symbol` | `IconSymbol` | — | Icon symbol for step |
| `optional` | `ReactNode` | — | Optional label below title |
| `StepLabelProps` | `object` | — | Props for the label |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | Step label text |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
const steps = ['Account', 'Profile', 'Review'];

<Stepper activeStep={activeStep}>
  {steps.map((label) => (
    <Step key={label}>
      <StepButton>{label}</StepButton>
    </Step>
  ))}
</Stepper>
```

## Non-Linear

```tsx
<Stepper activeStep={activeStep} nonLinear>
  {steps.map((label, index) => (
    <Step key={label} completed={completed.has(index)}>
      <StepButton onClick={() => setActiveStep(index)}>
        {label}
      </StepButton>
    </Step>
  ))}
</Stepper>
```

## Vertical

```tsx
<Stepper activeStep={activeStep} orientation="vertical">
  {steps.map((step) => (
    <Step key={step.label}>
      <StepButton optional={step.optional && <span className="text-sm text-neutral-b3">Optional</span>}>
        {step.label}
      </StepButton>
      {/* Step content goes here in vertical mode */}
    </Step>
  ))}
</Stepper>
```

## Complete Wizard Example

```tsx
function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Account Info', 'Personal Details', 'Confirmation'];

  return (
    <div className="max-w-2xl mx-auto">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </Stepper>

      <div className="mt-6">
        {activeStep === 0 && <AccountForm />}
        {activeStep === 1 && <PersonalForm />}
        {activeStep === 2 && <ConfirmationView />}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((s) => s - 1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (activeStep === steps.length - 1) {
              handleSubmit();
            } else {
              setActiveStep((s) => s + 1);
            }
          }}
        >
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
```
