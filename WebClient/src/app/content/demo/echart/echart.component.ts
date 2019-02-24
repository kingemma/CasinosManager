import { Component, OnInit } from '@angular/core';
import { MockDataService, ConsumeDto } from '../../../shared/service-proxy/mockdata.service'

@Component({
  selector: 'app-echart',
  templateUrl: './echart.component.html',
  styleUrls: ['./echart.component.css']
})
export class EchartComponent implements OnInit {

  chartOption: any;
  chartOption2: any;

  constructor(private service: MockDataService) {

  }

  ngOnInit() {
    this.service.getEchartData()
      .subscribe(result => {
        this.initChart(result);
      });

      this.initPieChart(null);
  }

  initChart(dataList: ConsumeDto[]) {

    this.chartOption = {
      title: {
        text: '折线图'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        data: ['消费统计']
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: (function () {
            var d = [];
            for (let item of dataList) {
              d.push(item.date);
            }
            return d;
          })()
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '消费金额',
          type: 'line',
          data: (function () {
            var d = [];
            for (let item of dataList) {
              d.push(item.amount);
            }
            return d;
          })()
        }
      ]
    }
  }

  initPieChart(dataList:ConsumeDto[]){
    this.chartOption2 = {
      title : {
          text: '消费比例'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient : 'vertical',
          x : 'left',
          data:[]
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                  show: true, 
                  type: ['pie', 'funnel'],
                  option: {
                      funnel: {
                          x: '25%',
                          width: '50%',
                          funnelAlign: 'left',
                          max: 1548
                      }
                  }
              },
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      series : [
          {
              name:'消费比例',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ]
          }
      ]
  };
                      
  }
}
