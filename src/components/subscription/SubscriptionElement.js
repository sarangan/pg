import React, {Component} from "react";
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import loginauth from '../../auth/loginauth';

export default class SubscriptionElement extends Component {

  constructor(props){
    super(props);
    this.state ={
      showCoupon : false
    }
  }

  componentWillMount(){

  }

  componentWillUnmount(){

  }

  toggleCoupon = () =>{
    this.setState( prevState =>({
      showCoupon : !prevState.showCoupon
    }) );
  }


  render(){

    const styles = {

        subTxt: {
          paddingLeft: 16,
          paddingRight: 16,
          maxWidth: 300,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 12,
          fontWeight: '600',
          color: '#333333'
        },
        subTxtnoplan: {
          paddingLeft: 16,
          paddingRight: 16,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 12,
          color: '#333333',
          paddingTop: 3,
          paddingBottom: 3,
          fontWeight: '600'
        },

    };

    let today = new Date();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    //check if last plan is for current month
    let payment_status = [];
   if(this.props.subscription && this.props.subscription.hasOwnProperty('createdAt')){
      let plan_date = new Date(this.props.subscription.createdAt);
      let get_last_sub_month = plan_date.getMonth() + 1;
      let get_last_sub_year = plan_date.getFullYear();


    if(get_last_sub_month == mm && get_last_sub_year == yyyy){

      if(this.props.subscription.splan_id == 1000){
         payment_status.push(<div key={1} style={styles.subTxtnoplan}>Status: {this.props.subscription.total_sliver_reports == 0 ? ' You have enough credit to generate one report' : 'You may need to purchase subscription plan to generate report'  }</div>);

         if(this.props.subscription.total_sliver_reports != 0){
           payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: '700', fontSize: 17}}>
             Your subscription plan has been expired
           </CardText>);

           payment_status.push(<CardActions key={5}>
           <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
             <RaisedButton secondary={true} label="Buy Subscription plan" />
           </a>
           <IconButton onClick={()=>this.props.fetchSubs()}><RefreshIcon/></IconButton>
           <span style={{cursor: 'pointer', color: '#0d47a1', textDecoration: 'underline' ,fontWeight: 'normal', fontSize: 14}} onClick={()=>this.toggleCoupon()}> Have a coupon? Click here to enter your coupon </span>
         </CardActions>);


         payment_status.push(
           <div style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingBottom: 10,  display: this.state.showCoupon? 'inline': 'none'}} key={6} >
              <TextField  style={{marginRight: 3}} hintText="Coupon code" floatingLabelText="Coupon code" fullWidth={false} name="coupon_code" onChange={this.props.handleInputChange}/>
              <RaisedButton secondary={false} label="Apply coupon" onClick={()=>this.props.applyCoupon()}/>
           </div>
         );

         }
      }

      if(this.props.subscription.splan_id == 2000){
        payment_status.push(<div key={2} style={styles.subTxtnoplan}>Status: {this.props.subscription.total_gold_reports < this.props.subscription.reports ? 'You can generate ' + (this.props.subscription.reports - this.props.subscription.total_gold_reports) + ' more reports' : 'You may need to purchase subscription plan to generate report'  }</div>);

        if(this.props.subscription.total_gold_reports >= this.props.subscription.reports){
          payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: '700', fontSize: 17}}>
            Your subscription plan has been expired
          </CardText>);

          payment_status.push(<CardActions key={5}>
          <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
            <RaisedButton secondary={true} label="Buy Subscription plan" />
          </a>
          <IconButton onClick={()=>this.props.fetchSubs()}><RefreshIcon/></IconButton>
          <span style={{cursor: 'pointer', color: '#0d47a1', textDecoration: 'underline' ,fontWeight: 'normal', fontSize: 14}} onClick={()=>this.toggleCoupon()}> Have a coupon? Click here to enter your coupon </span>
        </CardActions>);

        payment_status.push(
          <div style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingBottom: 10,  display: this.state.showCoupon? 'inline': 'none'}} key={6} >
             <TextField  style={{marginRight: 3}} hintText="Coupon code" floatingLabelText="Coupon code" fullWidth={false} name="coupon_code" onChange={this.props.handleInputChange}/>
             <RaisedButton secondary={false} label="Apply coupon" onClick={()=>this.props.applyCoupon()}/>
          </div>
        );

        }

      }

      if(this.props.subscription.splan_id == 3000){
        payment_status.push(<div key={3} style={styles.subTxtnoplan}>You can generate unlimited number of reports</div>);
      }



    }
    else{
      payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: '700', fontSize: 14}}>
        Your subscription plan has been expired
      </CardText>);
      payment_status.push(<CardActions key={5}>
      <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
        <RaisedButton secondary={true} label="Buy Subscription plan" />
      </a>
      <IconButton onClick={()=>this.props.fetchSubs()}><RefreshIcon/></IconButton>
      <span style={{cursor: 'pointer', color: '#0d47a1', textDecoration: 'underline' ,fontWeight: 'normal', fontSize: 14}} onClick={()=>this.toggleCoupon()}> Have a coupon? Click here to enter your coupon </span>
    </CardActions>);

    payment_status.push(
      <div style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingBottom: 10,  display: this.state.showCoupon? 'inline': 'none'}} key={6} >
         <TextField  style={{marginRight: 3}} hintText="Coupon code" floatingLabelText="Coupon code" fullWidth={false} name="coupon_code" onChange={this.props.handleInputChange}/>
         <RaisedButton secondary={false} label="Apply coupon" onClick={()=>this.props.applyCoupon()}/>
      </div>
    );

    }

  }


    return(
      <div>
          <div style={{marginTop: 20}}>
            <h3 style={{color: '#0097A7', fontSize: 16}}>Subscription details</h3>
          </div>

          {this.props.subscription && this.props.subscription.subs_id &&
            <Card style={{boxShadow: 'none', backgroundColor: '#E0F7FA'}} className='box-shadow'>
              <CardTitle title={this.props.subscription.title } style={{color: '#00695C', fontWeight: '600', fontSize: 14}} />
                <div style={styles.subTxtnoplan}>You recent subscription plan - {this.props.subscription.title } </div>
                <div style={styles.subTxtnoplan}>Last payment date: {this.props.subscription.alt_created_date}</div>
                <div style={styles.subTxtnoplan}>Price: {this.props.subscription.price}</div>
                {payment_status}

            </Card>
          }
          {this.props.subscription && !this.props.subscription.subs_id &&
            <Card className='box-shadow'>
              <CardText style={{color: '#e2401c', fontWeight: 'normal', fontSize: 14}}>
                You don't have any subscription plan yet
              </CardText>
              <div style={styles.subTxtnoplan}>Please purchase a subcription plan before generate reports.</div>
              <div style={styles.subTxtnoplan}>You cannot download reports if you have zero credit</div>
              <CardActions>

                <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
                  <RaisedButton secondary={true} label="Buy Subscription plan" />
                </a>
                <IconButton onClick={()=>this.props.fetchSubs()}><RefreshIcon/></IconButton>
                <span style={{cursor: 'pointer', color: '#0d47a1', textDecoration: 'underline' ,fontWeight: 'normal', fontSize: 14}} onClick={()=>this.toggleCoupon()}> Have a coupon? Click here to enter your coupon </span>
              </CardActions>

              <div style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingBottom: 10,  display: this.state.showCoupon? 'inline': 'none'}} key={6} >
                 <TextField  style={{marginRight: 3}} hintText="Coupon code" floatingLabelText="Coupon code" fullWidth={false} name="coupon_code" onChange={this.props.handleInputChange}/>
                 <RaisedButton secondary={false} label="Apply coupon" onClick={()=>this.props.applyCoupon()}/>
              </div>

            </Card>
          }


          {!this.props.subscription &&
            <Card className='box-shadow'>
              <CardText style={{color: '#D32F2F', fontWeight: 'normal', fontSize: 14}}>
                You don't have any subscription plan yet
              </CardText>
              <div style={styles.subTxtnoplan}>Please purchase a subcription plan before generate reports.</div>
              <div style={styles.subTxtnoplan}>You cannot download reports if you have zero credit</div>

              <CardActions>

                <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
                  <RaisedButton secondary={true} label="Buy Subscription plan" />
                </a>
                <IconButton onClick={()=>this.props.fetchSubs()}><RefreshIcon/></IconButton>
                <span style={{cursor: 'pointer', color: '#0d47a1', textDecoration: 'underline' ,fontWeight: 'normal', fontSize: 14}} onClick={()=>this.toggleCoupon()}> Have a coupon? Click here to enter your coupon </span>
              </CardActions>

              <div style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingBottom: 10,  display: this.state.showCoupon? 'inline': 'none'}} key={6} >
                 <TextField  style={{marginRight: 3}} hintText="Coupon code" floatingLabelText="Coupon code" fullWidth={false} name="coupon_code" onChange={this.props.handleInputChange}/>
                 <RaisedButton secondary={false} label="Apply coupon" onClick={()=>this.props.applyCoupon()}/>
              </div>

            </Card>
          }
      </div>
    );
  }

}
