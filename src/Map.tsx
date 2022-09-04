import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";


import { useEffect, useRef } from "react";
import './css/custom.css';
import { uvrRenderer } from './Renderer/UvrRenderer';
import { generateOtherSQLString } from './FilterFunctions/SearchFilter';

export default function Maps() {
    const viewDiv = useRef<HTMLDivElement>(null);
    const infoDiv = useRef<HTMLDivElement>(null);
    const legendDiv = useRef<HTMLDivElement>(null);
    const filter = useRef<HTMLSelectElement>(null);

    useEffect(() => {

        const template = {
            title: "{Name}",
            lastEditInfoEnabled: false,
            content: [
                {
                    type: "fields",
                    fieldInfos: [
                        {
                            fieldName: "Address",
                            label: "Address"
                        },
                        {
                            fieldName: "Industry",
                            label: "Industry"
                        }]
                },
                {
                    type: "text",
                    text: '<b>{expression/has-website}</b> <a href={expression/website-expr}>{expression/website-expr}</a>'
                }
            ],
            expressionInfos: [{
                name: 'website-expr',
                title: "Website:",
                expression: 'IIF(!IsEmpty($feature.Website), $feature.Website, null)'
            }, {
                name: 'has-website',
                expression: 'IIf(!IsEmpty($feature.Website), "Website: ", "No website found for this business")'
            }]
        };

        const featureLayer = new FeatureLayer({
            title: "My-first-feature-layer",
            url: "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/survey123_0954ef4c3eb74d9989a91330c7740a9f/FeatureServer/0",
            copyright: "BGMAPP",
            popupTemplate: template,
            renderer: uvrRenderer as any,
            legendEnabled: true
        });

        const map = new Map({
            // basemap: "arcgis-topographic" // Basemap layer service
            basemap: "dark-gray-vector",
            layers: [featureLayer]
        });
        console.log(map);

        // map.add(fl);

        const view = new MapView({
            map: map,
            // center: [-118.805, 34.027], // Longitude, latitude
            // zoom: 13, // Zoom level
            container: viewDiv.current ?? undefined, // Div element
            extent: {
                xmin: -118.98364392089809,
                ymin: 33.64236255586565,
                xmax: -117.5073560791019,
                ymax: 34.4638389963474,
                //spatialReference: 4326
            }
        });

        view.when(() => {
            // Adding a Legend and Expand widget
            const legend = new Legend({
                view: view,
                container: legendDiv.current ?? undefined
            });

            const expand = new Expand({
                view: view,
                content: infoDiv.current ?? undefined,
                expanded: true
            });

            view.whenLayerView(featureLayer).then((layerView: any) => {
                const field = "Industry";

                // const filterSelect = document.getElementById("filter");
                const filterSelect = filter.current as any;
                // Event fires every time a different option is selected 
                // from the dropdown
                filterSelect.addEventListener('input', (event: any) => {
                    let filterExpression;
                    if (event.target.value === '1=1') {
                        // show all the features
                        filterExpression = event.target.value;
                    } else if (event.target.value === "other") {
                        // Show all other features with all other industries not
                        // included in the UniqueValueRenderer.uniqueValueInfos
                        filterExpression = generateOtherSQLString(field);
                    } else {
                        // Filter by the selected industry in the dropdown
                        filterExpression = `${field}='${event.target.value}'`;
                    }
                    // Apply the filter on the client-side layerView.
                    // No request will be sent out to the feature service for this.
                    layerView.filter = {
                        where: filterExpression
                    };
                });
            });

            view.ui.add(expand, "top-right");
        });


        return (() => { view && view.destroy(); });
    }, []);


    return (
        <>
            <div ref={viewDiv} id={"viewDiv"}></div>
            <div ref={infoDiv} id="infoDiv" className="esri-widget">
                <h3>Data provided by <a href="https://bgmapp.org/">Black Girls M.A.P.P</a></h3>
                <h4>Filter by Industry:</h4>
                <select ref={filter} id="filter" className="esri-select" >
                    <option value="1=1">All</option>
                    <option value="accessories_&_clothing">Accessories & Clothing</option>
                    <option value="arts_&_culture">Arts & Culture</option>
                    <option value="auto">Auto</option>
                    <option value="food_+_beverage">Food + Beverage</option>
                    <option value="hair_body_&_beauty">Hair, Body & Beauty</option>
                    <option value="health_&_medicine">Health & Medicine</option>
                    <option value="it_&_tech_hardware+software_">IT & Tech</option>
                    <option value="legal">Legal</option>
                    <option value="management">Management</option>
                    <option value="non_profit_organization">Non Profit Organization</option>
                    <option value="religious">Religious</option>
                    <option value="other">Other</option>
                </select>
                <br />
                <div ref={legendDiv} id="legendDiv"></div>
            </div>
        </>);
}
