import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Float "mo:base/Float";
actor DBank {
  stable var currentValue : Float = 200;
  stable var starttime = Time.now();
  Debug.print(debug_show (starttime));
  // currentValue := 300;
  // starttime := Time.now();
  // let id = 236548623715423675;
  // Debug.print(debug_show (id));
  public func topup(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };
  public func minus(minamount : Float) {
    let tempAmount : Float = currentValue -minamount;
    if (tempAmount >= 0) {
      currentValue := tempAmount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("OOps No Amount left to minus ");
    };

  };

  public query func checkbalance() : async Float {
    return currentValue;
  };
  public func compoundintrest() {
    let currenttime = Time.now();
    let timeelapsedNS = currenttime -starttime;
    let timeElapsedS = timeelapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    starttime := currenttime;

  };
  // topup();
};
