var http 		= require('http');
var request		= require('request');
var express    = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var Excel = require('exceljs');


var email_sender = 'eric.zhang@codexmarkets.com';


  	request.get('http://localhost:8080/api/1.0/?Procedure=select_all_test', function(error, response){

			//error handling
			if(error){
				console.error('Problem with connecting to the VoltDB instance', error);
			}			
			
			
  			//parsing and temporarily storing SQL results
			var response_body = response.body;
			var response_body_JSON = JSON.parse(response_body);
			var response_body_JSON_send = response_body_JSON.results[0].data;
			var num_rows = response_body_JSON_send.length;
			
			
			//creating new excel workbook for report output
			var workbook = new Excel.Workbook();
			var worksheet = workbook.addWorksheet('Report');
			

			//getting column names of report 
			var header_body = response_body_JSON.results[0].schema;
			var column_array = [];
			var num_cols = header_body.length;
			var column_i_name = '';
			
  			for (i = 0; i < num_cols; i++){
  				column_i_name = header_body[i].name;
  				var column_i = {};
  					column_i['header'] = column_i_name;
  					column_i['key'] = column_i_name;
  					column_array.push(column_i);
  			}
  			worksheet.columns = column_array;
			
			
			//adding data to excel file
			var row_i = [];
			console.log(response_body_JSON_send);
			
			for (i = 0; i < num_rows; i++){
				worksheet.addRow(response_body_JSON_send[i]);
			}
  			

  			//output to excel
			workbook.csv.writeFile('test.csv');
			
			//sending report to designated email
			function create_transport(req, res) {
				let transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: email_sender,
						pass: email_pass
					}
				});
				
				console.log(res);
			}
			
			var mailOptions = {
				from: email_sender,
				to: email_recipient,
				subject: 'test email',
				text: 'test email'
			};
			
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.error('Problem sending email', error);
				} else {
					console.log(info.response);
				}
			});
			
			
  	});

