    function makeVisible(id, section) {
      const visibleElement = document.getElementById(`${id}-description`)
      const allValuesClass = visibleElement.className;
      document.querySelectorAll(`#${section}-descriptions > p`).forEach(function(el) {
        el.style.display = 'none';
      });
      visibleElement.style.display = "inherit";

    }
    
    //should take parent id then can be used for both
    //ideally makePurple should not change the full classes, should just edit background colour and text colour
    // the purple column should include the dot from hank's design, but not sure how to do that

    function makePurple(id, section) {
      const purpleElement = document.getElementById(`${id}`)
      document.querySelectorAll(`#${section} >  div`).forEach(function(el) {
        //I don't like editing classnames in JS because it mixes design and function
        //but I can't access the $accent-color sass variables in js to edit the style directly
        //not sure how to do this otherwise
        //would be nice if liquid could handle the colour change with its conditional rendering, 
        //but i don't think that is how it works since it is set during build
        el.className = "ph4 pv2 mb2 accent pointer";
      });
      purpleElement.className = "ph4 pv2 mb2 bg-accent white pointer";
    } 

    function selectValue(id, section) {
      makeVisible(id, section);
      makePurple(id, section);
    };
    function initialState() {
      //make only the first card visible initially
      //these must be hard coded because js cannot be passed to liquid
    const firstWhat = "{{ page.what_we_do[0].title }}";
    const firstValue = "{{ page.values[0].title }}";
    selectValue(firstWhat, "what_we_do");
    selectValue(firstValue, "values");
    }

    initialState()

  