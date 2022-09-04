export const uvrRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    field: "Industry",
    defaultSymbol: {
        type: "simple-marker",
        color: "#b2b2b2", // light-gray
        size: "10px"
    },
    uniqueValueInfos: [{
        value: "accessories_&_clothing",
        label: "Accessories & Clothing",  // labels will appear on the Legend widget
        symbol: {
            type: "simple-marker",
            color: "#d9351a",
            size: "10px"
        }
    }, {
        value: "arts_&_culture",
        label: "Arts & Culture",
        symbol: {
            type: "simple-marker",
            color: "#ffc730",
            size: "10px"
        }
    }, {
        value: "auto",
        label: "Auto",
        symbol: {
            type: "simple-marker",
            color: "#144d59",
            size: "10px"
        }
    }, {
        value: "food_+_beverage",
        label: "Food + Beverage",
        symbol: {
            type: "simple-marker",
            color: "#2c6954",
            size: "10px"
        }
    }, {
        value: "hair_body_&_beauty",
        label: "Hair, Body & Beauty",
        symbol: {
            type: "simple-marker",
            color: "#ed9310",
            size: "10px"
        }
    }, {
        value: "health_&_medicine",
        label: "Health & Medicine",
        symbol: {
            type: "simple-marker",
            color: "#8c213f",
            size: "10px"
        }
    }, {
        value: "it_&_tech_hardware+software_",
        label: "IT & Tech",
        symbol: {
            type: "simple-marker",
            color: "#102432",
            size: "10px"
        }
    }, {
        value: "legal",
        label: "Legal",
        symbol: {
            type: "simple-marker",
            color: "#a64f1b",
            size: "10px"
        }
    }, {
        value: "management",
        label: "Management",
        symbol: {
            type: "simple-marker",
            color: "#18382e",
            size: "10px"
        }
    }, {
        value: "non_profit_organization",
        label: "Non Profit Organization",
        symbol: {
            type: "simple-marker",
            color: "#b31515",
            size: "10px"
        }
    }, {
        value: "religious",
        label: "Religious",
        symbol: {
            type: "simple-marker",
            color: "#4a0932",
            size: "10px"
        }
    }]
};