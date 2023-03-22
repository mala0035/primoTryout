sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/InputType",

   
    
 ], function (Controller, MessageToast, JSONModel, ResourceModel, Dialog, Button, Input, ) {
    "use strict";
    var dialogButtonRequest = new Button({
      text: "Abfragen",
      press: ""
    });

   

    

    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
      onInit : function () {
          // set data model on view
          var oData = {
             recipient : {
                name : "Schabalama",
                name2 : ["Schabalama2","Schabalama3"]
             }
          };
          var oModel = new JSONModel(oData);
          this.getView().setModel(oModel);
          // set i18n model on view
          var i18nModel = new ResourceModel({
             bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
          });
          this.getView().setModel(i18nModel, "i18n");
       },
       onShowHello : function () {
           // read msg from i18n model
          var oBundle = this.getView().getModel("i18n").getResourceBundle();
          var sRecipient = this.getView().getModel().getProperty("/recipient/name");
          var sRecipient2 = this.getView().getModel().getProperty("/recipient/name2")
          var sMsg = oBundle.getText("helloMsg", [sRecipient2]);
          // show message
          MessageToast.show(sMsg); 
         
          
       },

       onClickDialog : function () {
         // test dialog
   /*        if(!this.oDefaultDialog){
            this.oDefaultdialog = new Dialog({
               title: "Available PProducts",
               content: new Text ("Test")
            });
            this.getView().addDependent(this.oDefaultDialog);
         } */
         var inputProductDescription = new Input({
            description: "Produktbezeichnung",
            type: "Text"
         });
         var inputGtin = new Input({
            description: "GTIN",
            type: "Number"
         });
         var inputBossNr = new Input({
            description: "Boss-Nummer",
            type: "Number"
         });

         var dialogButtonCancel = new Button({
            text: "Schließen",
            press: function () {
               this.oDefaultDialog.close();
            }.bind(this)
          })
         
         this.oDefaultDialog = new Dialog({
            title: "Workflow starten",
            contentWidth: "700px",
            contentHeight: "500px",
            content: [inputProductDescription,inputGtin,inputBossNr],
            beginButton: new Button({
               text:"Abfragen", press: function(){}
            
            }),
            endButton: new Button({
               text:"Schließen",
               press: function(){
                  this.oDefaultDialog.close();
               }.bind(this)
            })
         })
          



         this.oDefaultDialog.open();
       },


       

    });
 });