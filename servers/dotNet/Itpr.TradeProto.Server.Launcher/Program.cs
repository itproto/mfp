using System;
using System.Collections.Generic;
using System.Reflection;

namespace Itpr.TradeProto.Server.Launcher
{
    class Program
    {

        private readonly IServiceLauncher _launcher;
        private bool _running = true;
        private LauncherConfig _config;

        private static readonly ConsoleLogger Log = new ConsoleLogger();
        private Program(IServiceLauncher serviceLauncher)
        {
            _launcher = serviceLauncher;
        }
        static void Main(string[] args)
        {
            var p = new Program(new ServiceLauncher());
            p.Run(ArgumentParser.GetLauncherConfig(args));
        }

        private void Run(LauncherConfig config)
        {
            _config = config;

            if (_config.Help)
            {
                Usage();
                return;
            }

            this._launcher.InitializeEventStore(_config.EventStoreParameters);
        }

        private static void Usage()
        {
            Console.WriteLine("Reactive Trader launcher v{0}", typeof(Program).GetTypeInfo().Assembly.GetName().Version);
            Console.WriteLine();
            Console.WriteLine("usage dotnet run [service] [options]");

        }
    }

    public interface IServiceLauncher
    {
        string StartService(ServiceType serviceType);
        bool KillService(string serviceName);
        IEnumerable<string> GetRunningServices();
        void InitializeEventStore(IEventStoreConfiguration config);
    }

    public enum ServiceType
    {
        Pricing,
        Blotter,
        Execution,
        Analytics,
        Reference,
        Unknown
    }
    public interface IEventStoreConfiguration
    {
        string Host { get; }
        int Port { get; }
    }

    public class LauncherConfig
    {
        public LauncherConfig()
        {
            InvalidArguments = new List<string>();
            ServicesToStart = new List<ServiceType>();
        }

        public bool PopulateEventStore { get; set; }
        public bool IsInteractive { get; set; }
        public bool Help { get; set; }
        public IEventStoreConfiguration EventStoreParameters { get; set; }
        public IEnumerable<ServiceType> ServicesToStart { get; set; }
        public IEnumerable<string> InvalidArguments { get; set; }
    }

}
