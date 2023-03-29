sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/InputType",
    "sap/m/ComboBox",
    "sap/base/Log",
  
    

   
    
 ], function (Controller, MessageToast, JSONModel, ResourceModel, Dialog, Button, Input, Inputtpy, ComboBox, Log, ) {
    "use strict";


    

    

    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
      onInit : function () {
         
        
       
          // set data model on view
          var oData = {
             recipient : {
                name : "Test",
                name2 : ["Test2","Test3"]
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
          Log.warning(sRecipient2);
          MessageToast.show(sMsg); 
         
          
       },
      

       onClickDialog : function () {
         
         var ComboBoxWorkflowItems = {
            Workflowtypen : {
               Type : ["Neueröffnung"]
            }
         }
         var oModel2 = new JSONModel(ComboBoxWorkflowItems);
         this.getView().setModel(oModel2);
         var workflows = this.getView().getModel().getProperty("/Workflowtypen/Type");


         var categoryItemTemplate = new sap.ui.core.Item({ 
         key : "Item1", 
         text : "testText",
         
      });
      var categoryItemTemplate2 = new sap.ui.core.Item({ 
         key : "Item1", 
         text : "testText2" 
      });

      var workflowlist = new sap.m.List({

      })

        
      
      Log.warning([workflows]);
         var oItemTemplate1 = new sap.ui.core.ListItem();
         //oItemTemplate1.bindProperty(workflows);

         var dialogCombobox = new ComboBox({
            value:"Workflow auswählen",
            items: [
        new sap.ui.core.Item({text: "Neueröffnung"}),
        new sap.ui.core.Item({text: "Mutation"}),
        new sap.ui.core.Item({text: "Preisabschlag"}),
        new sap.ui.core.Item({text: "Preisaufschlag"}),
        new sap.ui.core.Item({text: "Saisonzeitraum"}),
        new sap.ui.core.Item({text: "Auslauf"}),
    ]
         
         });
 
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
            content: [
               dialogCombobox,
               inputProductDescription,
               inputGtin,
               inputBossNr],
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