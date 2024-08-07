function useConvertSystem() {
    function convertToViewSystem({ labelValue, numbersBeforeConversion = 2 }) {
        const num = Math.abs(Number(labelValue));
        return num >= 1.0e9
            ? (num / 1.0e9).toFixed(numbersBeforeConversion) + "B"
            : num >= 1.0e6
              ? (num / 1.0e6).toFixed(numbersBeforeConversion) + "M"
              : numberWithCommas(num);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return { convertToViewSystem };
}

export default useConvertSystem;
