<form>

  <TextField  hintText="Address 1" floatingLabelText="Address 1" fullWidth={true} name="address_1" value={this.state.address_1} onChange={this.handleInputChange.bind(this)}/>
  <TextField  hintText="Address 2" floatingLabelText="Address 2" fullWidth={true} name="address_2" value={this.state.address_2} onChange={this.handleInputChange.bind(this)}/>
  <TextField  hintText="City" floatingLabelText="City" fullWidth={false} name="city" value={this.state.city} onChange={this.handleInputChange.bind(this)} />
  <TextField  hintText="Postalcode" floatingLabelText="Postalcode" fullWidth={false} name="postalcode" value={this.state.postalcode} onChange={this.handleInputChange.bind(this)}/>

  <Divider style={styles.bottomDivider}/>
  <h4>Report Details:</h4>

  <SelectField floatingLabelText="Report type" value={this.state.report_type} onChange={this.handleSelectChange.bind(this)}  name="report_type">
    <MenuItem value={null} primaryText=""/>
    <MenuItem value={"Check-in Report"}  primaryText="Check-in Report" />
    <MenuItem value={"Check-out Report"} primaryText="Check-out Report"/>
    <MenuItem value={"Inventory Report"}  primaryText="Inventory Report"/>
    <MenuItem value={"Inventory and Check-in Report"} primaryText="Inventory and Check-in Report"/>
    <MenuItem value={"Midterm Inspection Report"}  primaryText="Midterm Inspection Report"/>
    <MenuItem value={"Interim Report"} primaryText="Interim Report"/>
    <MenuItem value={"General Overview Report"} primaryText="General Overview Report"/>
    <MenuItem value={"Condition Report"} primaryText="Condition Report"/>
  </SelectField>

  <DatePicker hintText="Report Date" floatingLabelText="Report Date" fullWidth={false} name="report_date" value={this.state.report_date} onChange={this.handleDateChange.bind(this)}/>

  <TextField hintText="Description" multiLine={true} rows={2} rowsMax={4}  name="description" fullWidth={true} value={this.state.description} onChange={this.handleInputChange.bind(this)}/>

  <div style={styles.buttons}>

    <Link to="/propertylist">
      <RaisedButton label="Cancel"/>
    </Link>

    <RaisedButton label="Save"
      style={styles.saveButton}
      onClick={this.handleSubmit.bind(this)}
      primary={true}/>

</div>

</form>
