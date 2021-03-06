import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

let items = [];

class Carousel2 extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0 ,
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex} = this.state;
    let {slide} = this.props;
    items = slide.map((slide) => {
      //{images} style={{width:'100%'}}
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={slide.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
        <img src={require('./../images/'+slide.id+'.png')} style={{width:'100%'}} alt=""/>
          <CarouselCaption className="text-defalut" captionText='' captionHeader={slide.caption} />
        </CarouselItem>
      );
    });
    return (
      <div>
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                height: 550px;
                background: gray;
              }`
          }
        </style>
        <br/>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {items}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}


export default Carousel2;