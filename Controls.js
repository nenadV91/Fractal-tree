const controls = $('#controls table tbody');

class Control {
  constructor(props) {
    this.text = props.text || "Label";
    this.min = props.min || 0;
    this.max = props.max || 5;
    this.step = props.step || 0.1;
    this.onChange = props.onChange;
    this.onClick = props.onClick;
    this.value = props.value;
    this.snap = props.snap;
    this.scale = props.scale;
    this.type = props.type;
  }

  render() {
    if(this.type == "slider") this.slider();
    if(this.type == "toggle") this.toggle();
    if(this.type == "button") this.button();
  }

  toggle() {
    let labelCell = $("<td />", {
      text: this.text,
      class: "control-label"
    });

    let switchCell = $("<td />", {
      class: "control-element"
    })

    let toggle = $("<input />", {
      class: "slider-input",
      type: "checkbox",
      checked: this.value,
      on: {
        change: event => this.onChange(event.target.checked)
      }
    });

    let element = $("<tr />", {
      class: "control-option"
    });

    labelCell.appendTo(element);
    toggle.appendTo(switchCell);
    switchCell.appendTo(element);
    element.appendTo(controls);
  }
  
  slider() {
    let labelCell = $("<td />", {
      text: this.text,
      class: "control-label"
    });

    let sliderCell = $("<td />", {
      class: "control-element"
    })

    let slider = $("<input />", {
      class: "slider-input",
      value: this.value
    });

    let element = $("<tr />", {
      class: "control-option"
    });

    labelCell.appendTo(element);
    slider.appendTo(sliderCell);
    sliderCell.appendTo(element);
    element.appendTo(controls);


    slider.jRange({
        from: this.min,
        to: this.max,
        step: this.step,
        snap: this.snap || false,
        scale: this.scale || false,
        width: "100%",
        onstatechange: (value) => {
          if(typeof tree != "undefined") {
            this.onChange(value);
          }
        }
    });
  }

  button() {
    let labelCell = $("<td />", {
      class: "control-label"
    });

    let buttonCell = $("<td />", {
      class: "control-element"
    })

    let button = $("<button />", {
      class: "button",
      type: "button",
      text: this.text,
      on: {
        click: event => this.onClick(event)
      }
    });

    let element = $("<tr />", {
      class: "control-option"
    });
    
    labelCell.appendTo(element);
    button.appendTo(buttonCell);
    buttonCell.appendTo(element);
    element.appendTo(controls);
  }
}