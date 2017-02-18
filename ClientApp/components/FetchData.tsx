import * as React from 'react';
import 'isomorphic-fetch';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';

interface FetchDataExampleState {
    forecasts: WeatherForecast[];
    loading: boolean;
}

export class FetchData extends React.Component<any, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };

        fetch('/api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<WeatherForecast[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <p>For more sophisticated applications, consider an architecture such as Redux or Flux for managing state. You can generate an ASP.NET Core application with React and Redux using <code>dotnet new aspnet/spa/reactredux</code> instead of using this template.</p>
        </div>;
    }

    private static renderForecastsTable(forecasts: WeatherForecast[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Sammanfattning</th>
                </tr>
            </thead>
            <Transition component="tbody" enter={{ translateX: spring(0, { stiffness: 50, damping: 10 }) }} leave={{ translateX: -200 }}>
                {forecasts.map(forecast =>
                    <tr key={forecast.dateFormatted}>
                        <td>{forecast.dateFormatted}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </Transition>
        </table>;
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
