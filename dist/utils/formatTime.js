'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var formatDay = function formatDay(time) {
    var daySplit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

    time = time.length < 13 ? Number.parseInt(time) * 1000 : Number.parseInt(time);
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return '' + year + daySplit + month + daySplit + day;
};
var formatSecond = function formatSecond(time) {
    var daySplit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
    var timeSplit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ':';

    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var min = date.getMinutes() < 10 ? '0' + date.getHours() : date.getHours();
    var sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return '' + year + daySplit + month + daySplit + day + ' ' + hour + timeSplit + min + timeSplit + sec;
};

exports.formatDay = formatDay;
exports.formatSecond = formatSecond;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm1hdFRpbWUuanMiXSwibmFtZXMiOlsiZm9ybWF0RGF5IiwidGltZSIsImRheVNwbGl0IiwibGVuZ3RoIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJkYXRlIiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiZm9ybWF0U2Vjb25kIiwidGltZVNwbGl0IiwiaG91ciIsImdldEhvdXJzIiwibWluIiwiZ2V0TWludXRlcyIsInNlYyIsImdldFNlY29uZHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsWUFBWSxTQUFaQSxTQUFZLENBQUNDLElBQUQsRUFBMEI7QUFBQSxRQUFuQkMsUUFBbUIsdUVBQVIsR0FBUTs7QUFDdENELFdBQU9BLEtBQUtFLE1BQUwsR0FBYyxFQUFkLEdBQW1CQyxPQUFPQyxRQUFQLENBQWdCSixJQUFoQixJQUF3QixJQUEzQyxHQUFrREcsT0FBT0MsUUFBUCxDQUFnQkosSUFBaEIsQ0FBekQ7QUFDQSxRQUFJSyxPQUFPLElBQUlDLElBQUosQ0FBU04sSUFBVCxDQUFYO0FBQ0EsUUFBSU8sT0FBT0YsS0FBS0csV0FBTCxFQUFYO0FBQ0EsUUFBSUMsUUFBUUosS0FBS0ssUUFBTCxLQUFrQixDQUFsQixHQUFzQixFQUF0QixHQUEyQixPQUFPTCxLQUFLSyxRQUFMLEtBQWtCLENBQXpCLENBQTNCLEdBQXlETCxLQUFLSyxRQUFMLEtBQWtCLENBQXZGO0FBQ0EsUUFBSUMsTUFBTU4sS0FBS08sT0FBTCxLQUFpQixFQUFqQixHQUFzQixNQUFPUCxLQUFLTyxPQUFMLEVBQTdCLEdBQStDUCxLQUFLTyxPQUFMLEVBQXpEO0FBQ0EsZ0JBQVVMLElBQVYsR0FBaUJOLFFBQWpCLEdBQTRCUSxLQUE1QixHQUFvQ1IsUUFBcEMsR0FBK0NVLEdBQS9DO0FBQ0gsQ0FQRDtBQVFBLElBQUlFLGVBQWUsU0FBZkEsWUFBZSxDQUFDYixJQUFELEVBQTJDO0FBQUEsUUFBcENDLFFBQW9DLHVFQUF6QixHQUF5QjtBQUFBLFFBQXBCYSxTQUFvQix1RUFBUixHQUFROztBQUMxRCxRQUFJVCxPQUFPLElBQUlDLElBQUosQ0FBU04sSUFBVCxDQUFYO0FBQ0EsUUFBSU8sT0FBT0YsS0FBS0csV0FBTCxFQUFYO0FBQ0EsUUFBSUMsUUFBUUosS0FBS0ssUUFBTCxLQUFrQixDQUFsQixHQUFzQixFQUF0QixHQUEyQixPQUFPTCxLQUFLSyxRQUFMLEtBQWtCLENBQXpCLENBQTNCLEdBQXlETCxLQUFLSyxRQUFMLEtBQWtCLENBQXZGO0FBQ0EsUUFBSUMsTUFBTU4sS0FBS08sT0FBTCxLQUFpQixFQUFqQixHQUFzQixNQUFPUCxLQUFLTyxPQUFMLEVBQTdCLEdBQStDUCxLQUFLTyxPQUFMLEVBQXpEO0FBQ0EsUUFBSUcsT0FBT1YsS0FBS1csUUFBTCxLQUFrQixFQUFsQixHQUF1QixNQUFNWCxLQUFLVyxRQUFMLEVBQTdCLEdBQStDWCxLQUFLVyxRQUFMLEVBQTFEO0FBQ0EsUUFBSUMsTUFBTVosS0FBS2EsVUFBTCxLQUFvQixFQUFwQixHQUF5QixNQUFNYixLQUFLVyxRQUFMLEVBQS9CLEdBQWlEWCxLQUFLVyxRQUFMLEVBQTNEO0FBQ0EsUUFBSUcsTUFBTWQsS0FBS2UsVUFBTCxLQUFvQixFQUFwQixHQUF5QixNQUFNZixLQUFLZSxVQUFMLEVBQS9CLEdBQW1EZixLQUFLZSxVQUFMLEVBQTdEO0FBQ0EsZ0JBQVViLElBQVYsR0FBaUJOLFFBQWpCLEdBQTRCUSxLQUE1QixHQUFvQ1IsUUFBcEMsR0FBK0NVLEdBQS9DLFNBQXNESSxJQUF0RCxHQUE2REQsU0FBN0QsR0FBeUVHLEdBQXpFLEdBQStFSCxTQUEvRSxHQUEyRkssR0FBM0Y7QUFDSCxDQVREOztRQVdRcEIsUyxHQUFBQSxTO1FBQVdjLFksR0FBQUEsWSIsImZpbGUiOiJmb3JtYXRUaW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGZvcm1hdERheSA9ICh0aW1lLCBkYXlTcGxpdCA9ICctJykgPT4ge1xyXG4gICAgdGltZSA9IHRpbWUubGVuZ3RoIDwgMTMgPyBOdW1iZXIucGFyc2VJbnQodGltZSkgKiAxMDAwIDogTnVtYmVyLnBhcnNlSW50KHRpbWUpXHJcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbWUpXHJcbiAgICBsZXQgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxyXG4gICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMVxyXG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyAnMCcgKyAoZGF0ZS5nZXREYXRlKCkpIDogZGF0ZS5nZXREYXRlKClcclxuICAgIHJldHVybiBgJHt5ZWFyfSR7ZGF5U3BsaXR9JHttb250aH0ke2RheVNwbGl0fSR7ZGF5fWBcclxufVxyXG5sZXQgZm9ybWF0U2Vjb25kID0gKHRpbWUsIGRheVNwbGl0ID0gJy0nLCB0aW1lU3BsaXQgPSAnOicpID0+IHtcclxuICAgIGxldCBkYXRlID0gbmV3IERhdGUodGltZSlcclxuICAgIGxldCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXHJcbiAgICBsZXQgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxIDwgMTAgPyAnMCcgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgOiBkYXRlLmdldE1vbnRoKCkgKyAxXHJcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCkgPCAxMCA/ICcwJyArIChkYXRlLmdldERhdGUoKSkgOiBkYXRlLmdldERhdGUoKVxyXG4gICAgbGV0IGhvdXIgPSBkYXRlLmdldEhvdXJzKCkgPCAxMCA/ICcwJyArIGRhdGUuZ2V0SG91cnMoKSA6IGRhdGUuZ2V0SG91cnMoKVxyXG4gICAgbGV0IG1pbiA9IGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyAnMCcgKyBkYXRlLmdldEhvdXJzKCkgOiBkYXRlLmdldEhvdXJzKClcclxuICAgIGxldCBzZWMgPSBkYXRlLmdldFNlY29uZHMoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXRTZWNvbmRzKCkgOiBkYXRlLmdldFNlY29uZHMoKVxyXG4gICAgcmV0dXJuIGAke3llYXJ9JHtkYXlTcGxpdH0ke21vbnRofSR7ZGF5U3BsaXR9JHtkYXl9ICR7aG91cn0ke3RpbWVTcGxpdH0ke21pbn0ke3RpbWVTcGxpdH0ke3NlY31gXHJcbn1cclxuXHJcbmV4cG9ydCB7Zm9ybWF0RGF5LCBmb3JtYXRTZWNvbmR9XHJcbiJdfQ==