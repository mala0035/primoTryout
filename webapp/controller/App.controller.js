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
               Type : [
                  {text:"Neueröffnung"},
                  {text:"Mutation"},
                  {text:"Preisabschlag"},
                  {text:"Preisaufschlag"},
                  {text:"Saisonzeitraum"},
                  {text:"Auslauf"},
               
               ]
            }
         }
         var oModel2 = new JSONModel(ComboBoxWorkflowItems);
         this.getView().setModel(oModel2);
         var workflows = this.getView().getModel().getProperty("/Workflowtypen/Type/");
             
      
      Log.warning(workflows);

      var spaceBox = new sap.m.VBox({height : "60px"})


         var oLabelProduktbezeichnung = new sap.m.Label({
            text: "Produktbezeichnung",




         });

         var oInputProduktbezeichnung = new sap.m.Input({
            
         })

         var oLabelGTIN = new sap.m.Label({
            text: "GTIN"
         });

         var oInputGTIN = new sap.m.Input({
            
         })

         var oLabelBossNummer = new sap.m.Label({
            text: "Boss-Nummer"
         });

         var oInputBossNummer = new sap.m.Input({
            
         })


         var oFlexboxInputs = new sap.m.FlexBox({
            alignItems: "Start",
            justifyContent: "Start",
            height: "100%",
            width: "100%",
            direction: "Column",
            items: [spaceBox,oLabelProduktbezeichnung, oInputProduktbezeichnung,oLabelGTIN,oInputGTIN,oLabelBossNummer,oInputBossNummer]
        });
        

        var oViewInputs = new sap.ui.core.mvc.View({
         content: [oFlexboxInputs]
     });


         var dialogCombobox = new ComboBox({
            value:"Workflow auswählen",
            items: [workflows]
         
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

      
         
         this.oDefaultDialog = new Dialog({
            title: "Workflow starten",
            contentWidth: "700px",
            contentHeight: "500px",
            content: [
               dialogCombobox,
               oViewInputs,
               ],
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