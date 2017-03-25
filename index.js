/**
 * Created by louis on 25/03/17.
 */
import React ,{ Component} from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

export default class CountDown extends Component{
//   mixins: [TimerMixin]
  constructor( props ){
      super(props)
      this.state = {
          time: this.props.time ? this.props.time : 60,
            disabled: true
      }
  }

  componentDidMount(){
    this._countdown();
  }

  render(){
    let style = [styles.text];
    let component;
    if (this.state.disabled) {
      style.push({color: 'gray'});
      style.push(this.props.disabledTextStyle);
      component =
          <View
              style={[styles.wrapper,this.props.buttonStyle]}
              >
            <TouchableWithoutFeedback
                >
              <Text style={[style]}>{this.props.text}({this.state.time})</Text>
            </TouchableWithoutFeedback>
          </View>
    } else {
      component =
          <TouchableHighlight
              style={[styles.wrapper,this.props.buttonStyle]}
              onPress={ ()=>this._onPress()}
              >
            <Text style={[style,this.props.textStyle]}>{this.props.text}({this.state.time})</Text>
          </TouchableHighlight>
    }
    return (
        component
    )
  }
  _onPress(){
    if (this.state.disabled) {
      //nothing
    } else {
      this.setState({disabled: true});
      this._countdown();
      if(this.props.onPress){
          this.props.onPress();
      }
    }
  }

  _countdown(){
    var timer = function () {
      var time = this.state.time - 1;
      this.setState({time: time});
      if (time > 0) {
        this.setTimeout(timer, 1000);
      } else {
        this.setState({disabled: false});
        this.setState({time: this.props.time ? this.props.time : 60});
      }
    };
    this.setTimeout(timer.bind(this), 1000);
  }
});

const styles = StyleSheet.create({
  text: {
    color: 'black'
  },
  wrapper: {
    padding: 10,
    marginRight:10,
    backgroundColor: '#e5e5e5',
  }
});
